import React, { useEffect, useState } from 'react';
import { ADS_CONFIG } from '../../config/ads';
import './adsterra-top-banner.css';

const AdsterraTopBanner = () => {
    const [adError, setAdError] = useState(false);

    useEffect(() => {
        let script = null;
        let retryCount = 0;
        const maxRetries = ADS_CONFIG.adsterra.topBanner.maxRetries;

        const loadAdScript = () => {
            try {
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }

                window.atOptions = {
                    'key': ADS_CONFIG.adsterra.topBanner.id,
                    'format': 'iframe',
                    'height': 90,
                    'width': 728,
                    'params': {
                        'sameDomain': true,
                        'allowScriptAccess': true
                    }
                };

                script = document.createElement('script');
                script.id = 'adsterra-top-banner-script';
                script.async = true;
                script.crossOrigin = 'anonymous';
                script.setAttribute('data-ad-client', ADS_CONFIG.adsterra.topBanner.id);

                script.onerror = (error) => {
                    console.warn('Erro ao carregar script do Adsterra Top Banner:', error);
                    if (retryCount < maxRetries) {
                        retryCount++;
                        setTimeout(loadAdScript, ADS_CONFIG.adsterra.topBanner.retryDelay * retryCount);
                    } else {
                        setAdError(true);
                    }
                };

                script.onload = () => {
                    console.log('Script do Adsterra Top Banner carregado com sucesso');
                };

                script.src = `//www.highperformanceformat.com/${ADS_CONFIG.adsterra.topBanner.id}/invoke.js`;
                document.body.appendChild(script);
            } catch (error) {
                console.warn('Erro ao inicializar Adsterra Top Banner:', error);
                setAdError(true);
            }
        };

        if (process.env.NODE_ENV === 'development') {
            console.log('Adsterra Top Banner desabilitado em ambiente de desenvolvimento');
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
            <div className="adsterra-top-banner-container placeholder">
                <div className="ad-placeholder">
                    Espaço reservado para banner superior
                </div>
            </div>
        );
    }

    return (
        <div className="adsterra-top-banner-container">
            <div id={`container-${ADS_CONFIG.adsterra.topBanner.id}`}></div>
        </div>
    );
};

export default AdsterraTopBanner; 