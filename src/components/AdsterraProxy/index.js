import React, { useEffect, useState } from 'react';
import { ADS_CONFIG } from '../../config/ads';

const AdsterraProxy = ({ adId, format, height, width, containerId }) => {
    const [adError, setAdError] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        let script = null;
        let retryCount = 0;
        const maxRetries = 3;

        const loadAdScript = () => {
            try {
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }

                // Configuração do anúncio
                window.atOptions = {
                    'key': adId,
                    'format': format,
                    'height': height,
                    'width': width,
                    'params': {
                        'sameDomain': true,
                        'allowScriptAccess': true,
                        'secure': true
                    }
                };

                script = document.createElement('script');
                script.id = `adsterra-script-${adId}`;
                script.async = true;
                script.crossOrigin = 'anonymous';
                script.setAttribute('data-cfasync', 'false');
                script.setAttribute('data-ad-client', adId);

                // Adicionando fallback para erros de SSL e cookies de terceiros
                const handleScriptError = (error) => {
                    console.warn(`Erro ao carregar script do Adsterra (${adId}):`, error);
                    if (retryCount < maxRetries) {
                        retryCount++;
                        setTimeout(loadAdScript, 1000 * retryCount);
                    } else {
                        setAdError(true);
                    }
                };

                script.onerror = handleScriptError;

                script.onload = () => {
                    console.log(`Script do Adsterra (${adId}) carregado com sucesso`);
                    setScriptLoaded(true);
                };

                // Usar HTTPS explicitamente
                script.src = `https://www.highperformanceformat.com/${adId}/invoke.js`;
                document.body.appendChild(script);
            } catch (error) {
                console.warn(`Erro ao inicializar Adsterra (${adId}):`, error);
                setAdError(true);
            }
        };

        if (process.env.NODE_ENV === 'development') {
            console.log(`Adsterra (${adId}) desabilitado em ambiente de desenvolvimento`);
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
                console.warn('Erro ao verificar cookies de terceiros:', e);
                return false;
            }
        };

        if (!checkThirdPartyCookies()) {
            console.warn('Cookies de terceiros não são suportados neste navegador');
            setAdError(true);
            return;
        }

        loadAdScript();

        return () => {
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [adId, format, height, width]);

    if (adError || process.env.NODE_ENV === 'development') {
        return (
            <div className="adsterra-proxy-container placeholder">
                <div className="ad-placeholder">
                    Espaço reservado para anúncio
                </div>
            </div>
        );
    }

    return (
        <div className="adsterra-proxy-container">
            <div id={containerId}></div>
        </div>
    );
};

export default AdsterraProxy;