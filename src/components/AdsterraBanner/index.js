import React, { useEffect, useState } from 'react';
import { ADS_CONFIG } from '../../config/ads';
import './adsterra-banner.css';

const AdsterraBanner = () => {
    const [adError, setAdError] = useState(false);

    useEffect(() => {
        let script = null;
        let retryCount = 0;
        const maxRetries = ADS_CONFIG.adsterra.banner.maxRetries;

        const loadAdScript = () => {
            try {
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }

                window.atOptions = {
                    'key': ADS_CONFIG.adsterra.banner.id,
                    'format': 'iframe',
                    'height': 60,
                    'width': 468,
                    'params': {}
                };

                script = document.createElement('script');
                script.id = 'adsterra-banner-script';
                script.async = true;
                script.crossOrigin = 'anonymous';

                script.onerror = (error) => {
                    console.warn('Erro ao carregar script do Adsterra Banner:', error);
                    if (retryCount < maxRetries) {
                        retryCount++;
                        setTimeout(loadAdScript, ADS_CONFIG.adsterra.banner.retryDelay * retryCount);
                    } else {
                        setAdError(true);
                    }
                };

                script.onload = () => {
                    console.log('Script do Adsterra Banner carregado com sucesso');
                };

                script.src = `//www.highperformanceformat.com/${ADS_CONFIG.adsterra.banner.id}/invoke.js`;
                document.body.appendChild(script);
            } catch (error) {
                console.warn('Erro ao inicializar Adsterra Banner:', error);
                setAdError(true);
            }
        };

        if (process.env.NODE_ENV === 'development') {
            console.log('Adsterra Banner desabilitado em ambiente de desenvolvimento');
            return;
        }

        loadAdScript();

        return () => {
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    if (adError || process.env.NODE_ENV === 'development') {
        return (
            <div className="adsterra-banner placeholder">
                <div className="ad-placeholder">
                    Espaço reservado para banner
                </div>
            </div>
        );
    }

    return (
        <div className="adsterra-banner">
            {/* O anúncio será inserido aqui */}
        </div>
    );
};

export default AdsterraBanner; 