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
                    'params': {},
                    'domain': 'highperformanceformat.com'
                };

                // Cria o script
                script = document.createElement('script');
                script.id = `adsterra-script-${adId}`;
                script.async = true;
                script.crossOrigin = 'anonymous';
                script.setAttribute('data-cfasync', 'false');
                script.setAttribute('data-csp-nonce', 'adsterra-script');

                // Configura o timeout para o carregamento
                timeoutId = setTimeout(() => {
                    if (retryCount < maxRetries) {
                        setRetryCount(prev => prev + 1);
                        loadAdScript();
                    } else {
                        setAdError(true);
                    }
                }, 5000);

                script.onerror = (error) => {
                    console.warn(`Erro ao carregar script do Adsterra (${adId}):`, error);
                    clearTimeout(timeoutId);
                    if (retryCount < maxRetries) {
                        setRetryCount(prev => prev + 1);
                        console.log(`Tentativa ${retryCount + 1} de recarregar o script.`);
                        setTimeout(loadAdScript, 1000 * (retryCount + 1));
                    } else {
                        console.error('Falha ao carregar o script após várias tentativas. Verifique o certificado SSL ou entre em contato com o suporte do Adsterra.');
                        setAdError(true);
                    }
                };

                script.onload = () => {
                    clearTimeout(timeoutId);
                    console.log(`Script do Adsterra (${adId}) carregado com sucesso`);
                };

                // Usa HTTPS explicitamente e adiciona parâmetros de segurança
                script.src = `https://www.highperformanceformat.com/${adId}/invoke.js?domain=${window.location.hostname}&secure=true`;
                document.body.appendChild(script);

                // Adiciona tratamento de erro global para o script
                window.addEventListener('error', (event) => {
                    if (event.filename && event.filename.includes('invoke.js')) {
                        console.warn('Erro global no script do Adsterra:', event);
                        if (!adError && retryCount < maxRetries) {
                            setRetryCount(prev => prev + 1);
                            setTimeout(loadAdScript, 1000 * (retryCount + 1));
                        } else {
                            setAdError(true);
                        }
                    }
                }, true);

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
            window.removeEventListener('error', loadAdScript);
        };
    }, [adId, format, height, width, retryCount, adError]);

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