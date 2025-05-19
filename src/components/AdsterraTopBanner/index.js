import React, { useEffect, useState } from 'react';
import { ADS_CONFIG } from '../../config/ads';
import './adsterra-top-banner.css';

const AdsterraTopBanner = () => {
    const [adError, setAdError] = useState(false);

    useEffect(() => {
        let script = null;
        let retryCount = 0;
        const maxRetries = 3;

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
                    'params': {}
                };

                script = document.createElement('script');
                script.id = 'adsterra-top-banner-script';
                script.async = true;
                script.crossOrigin = 'anonymous';

                script.onerror = (error) => {
                    console.warn('Erro ao carregar script do Adsterra Top Banner:', error);
                    if (retryCount < maxRetries) {
                        retryCount++;
                        setTimeout(loadAdScript, 1000 * retryCount);
                    } else {
                        setAdError(true);
                    }
                };

                script.onload = () => {
                    console.log('Script do Adsterra Top Banner carregado com sucesso');
                };

                script.src = `https://www.highperformanceformat.com/${ADS_CONFIG.adsterra.topBanner.id}/invoke.js`;
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

        loadAdScript();

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