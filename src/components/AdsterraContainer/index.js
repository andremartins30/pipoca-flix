import React, { useEffect, useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { ADS_CONFIG } from '../../config/ads';
import './adsterra-container.css';

const AdsterraContainer = () => {
    const [adError, setAdError] = useState(false);

    useEffect(() => {
        let script = null;
        let retryCount = 0;
        const maxRetries = ADS_CONFIG.adsterra.container.maxRetries;

        const loadAdScript = () => {
            try {
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }

                // Configuração do anúncio
                window.atOptions = {
                    'key': ADS_CONFIG.adsterra.container.id,
                    'format': 'iframe',
                    'height': 250,
                    'width': 300,
                    'params': {
                        'sameDomain': true,
                        'allowScriptAccess': true
                    }
                };

                script = document.createElement('script');
                script.id = 'adsterra-container-script';
                script.async = true;
                script.setAttribute('data-cfasync', 'false');
                script.crossOrigin = 'anonymous';
                script.setAttribute('data-ad-client', ADS_CONFIG.adsterra.container.id);

                script.onerror = (error) => {
                    console.warn('Erro ao carregar script do Adsterra:', error);
                    if (retryCount < maxRetries) {
                        retryCount++;
                        setTimeout(loadAdScript, ADS_CONFIG.adsterra.container.retryDelay * retryCount);
                    } else {
                        setAdError(true);
                    }
                };

                script.onload = () => {
                    console.log('Script do Adsterra carregado com sucesso');
                };

                script.src = `//pl26668277.profitableratecpm.com/${ADS_CONFIG.adsterra.container.id}/invoke.js`;
                document.body.appendChild(script);
            } catch (error) {
                console.warn('Erro ao inicializar Adsterra Container:', error);
                setAdError(true);
            }
        };

        if (process.env.NODE_ENV === 'development') {
            console.log('Adsterra desabilitado em ambiente de desenvolvimento');
            return;
        }

        // Verifica se o navegador suporta cookies de terceiros
        const checkThirdPartyCookies = () => {
            try {
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                const result = iframe.contentWindow.navigator.cookieEnabled;
                document.body.removeChild(iframe);
                return result;
            } catch (e) {
                return false;
            }
        };

        if (checkThirdPartyCookies()) {
            loadAdScript();
        } else {
            console.warn('Cookies de terceiros não são suportados neste navegador');
            setAdError(true);
        }

        return () => {
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    if (adError || process.env.NODE_ENV === 'development') {
        return (
            <div className="adsterra-container placeholder">
                <div className="ad-placeholder">
                    Espaço reservado para anúncio
                </div>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="adsterra-container">
                <div id={`container-${ADS_CONFIG.adsterra.container.id}`}></div>
            </div>
        </ErrorBoundary>
    );
};

export default AdsterraContainer; 