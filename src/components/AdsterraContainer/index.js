import React, { useEffect, useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import './adsterra-container.css';

const AdsterraContainer = () => {
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

                script = document.createElement('script');
                script.async = true;
                script.setAttribute('data-cfasync', 'false');
                script.crossOrigin = 'anonymous';

                script.id = 'adsterra-container-script';

                script.onerror = (error) => {
                    console.warn('Erro ao carregar script do Adsterra:', error);
                    if (retryCount < maxRetries) {
                        retryCount++;
                        setTimeout(loadAdScript, 1000 * retryCount);
                    } else {
                        setAdError(true);
                    }
                };

                script.onload = () => {
                    console.log('Script do Adsterra carregado com sucesso');
                };

                script.src = '//pl26668277.profitableratecpm.com/2d0ce4709cffb0560e57a528bccd6b6f/invoke.js';
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

        loadAdScript();

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
                <div id="container-2d0ce4709cffb0560e57a528bccd6b6f"></div>
            </div>
        </ErrorBoundary>
    );
};

export default AdsterraContainer; 