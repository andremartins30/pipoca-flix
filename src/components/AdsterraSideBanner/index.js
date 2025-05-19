import React, { useEffect, useState } from 'react';
import { ADS_CONFIG } from '../../config/ads';
import './adsterra-side-banner.css';

const AdsterraSideBanner = () => {
    const [adError, setAdError] = useState(false);

    useEffect(() => {
        let script = null;
        let retryCount = 0;
        const maxRetries = ADS_CONFIG.adsterra.sideBanner.maxRetries;

        const loadAdScript = () => {
            try {
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }

                window.atOptions = {
                    'key': ADS_CONFIG.adsterra.sideBanner.id,
                    'format': 'iframe',
                    'height': 300,
                    'width': 160,
                    'params': {}
                };

                script = document.createElement('script');
                script.id = 'adsterra-side-banner-script';
                script.async = true;
                script.crossOrigin = 'anonymous';

                script.onerror = (error) => {
                    console.warn('Erro ao carregar script do Adsterra Side Banner:', error);
                    if (retryCount < maxRetries) {
                        retryCount++;
                        setTimeout(loadAdScript, ADS_CONFIG.adsterra.sideBanner.retryDelay * retryCount);
                    } else {
                        setAdError(true);
                    }
                };

                script.onload = () => {
                    console.log('Script do Adsterra Side Banner carregado com sucesso');
                };

                script.src = `//www.highperformanceformat.com/${ADS_CONFIG.adsterra.sideBanner.id}/invoke.js`;
                document.body.appendChild(script);
            } catch (error) {
                console.warn('Erro ao inicializar Adsterra Side Banner:', error);
                setAdError(true);
            }
        };

        if (process.env.NODE_ENV === 'development') {
            console.log('Adsterra Side Banner desabilitado em ambiente de desenvolvimento');
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
            <div className="adsterra-side-banner-container placeholder">
                <div className="ad-placeholder">
                    Espaço reservado para banner lateral
                </div>
            </div>
        );
    }

    return (
        <div className="adsterra-side-banner-container">
            <div id={`container-${ADS_CONFIG.adsterra.sideBanner.id}`}></div>
        </div>
    );
};

export default AdsterraSideBanner; 