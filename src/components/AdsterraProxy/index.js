import React, { useEffect, useState } from 'react';
import { ADS_CONFIG } from '../../config/ads';

const AdsterraProxy = ({ adId, format = 'iframe', height, width, containerId }) => {
    const [adError, setAdError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;

    useEffect(() => {
        let script = null;
        let timeoutId = null;

        const loadAdScript = () => {
            try {
                // Limpa qualquer script anterior
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }

                // Configura as opções do anúncio
                window.atOptions = {
                    'key': adId,
                    'format': format,
                    'height': height,
                    'width': width,
                    'params': {}
                };

                // Cria o script
                script = document.createElement('script');
                script.id = `adsterra-script-${adId}`;
                script.async = true;
                script.crossOrigin = 'anonymous';
                script.setAttribute('data-cfasync', 'false');

                // Configura o timeout para o carregamento
                timeoutId = setTimeout(() => {
                    if (retryCount < maxRetries) {
                        setRetryCount(prev => prev + 1);
                        loadAdScript();
                    } else {
                        setAdError(true);
                    }
                }, 5000); // 5 segundos de timeout

                script.onerror = (error) => {
                    console.warn(`Erro ao carregar script do Adsterra (${adId}):`, error);
                    clearTimeout(timeoutId);
                    if (retryCount < maxRetries) {
                        setRetryCount(prev => prev + 1);
                        setTimeout(loadAdScript, 1000 * (retryCount + 1));
                    } else {
                        setAdError(true);
                    }
                };

                script.onload = () => {
                    clearTimeout(timeoutId);
                    console.log(`Script do Adsterra (${adId}) carregado com sucesso`);
                };

                // Usa HTTPS explicitamente
                script.src = `https://www.highperformanceformat.com/${adId}/invoke.js`;
                document.body.appendChild(script);
            } catch (error) {
                console.warn(`Erro ao inicializar Adsterra (${adId}):`, error);
                setAdError(true);
            }
        };

        // Verifica se estamos em ambiente de desenvolvimento
        if (process.env.NODE_ENV === 'development') {
            console.log(`Adsterra (${adId}) desabilitado em ambiente de desenvolvimento`);
            return;
        }

        loadAdScript();

        return () => {
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [adId, format, height, width, retryCount]);

    if (adError || process.env.NODE_ENV === 'development') {
        return (
            <div className="adsterra-placeholder">
                <div className="ad-placeholder">
                    Espaço reservado para anúncio
                </div>
            </div>
        );
    }

    return (
        <div className="adsterra-container">
            <div id={containerId}></div>
        </div>
    );
};

export default AdsterraProxy;