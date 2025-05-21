import React, { useEffect } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import './adsterra-container.css';

const AdsterraContainer = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = '//pl26668277.profitableratecpm.com/2d0ce4709cffb0560e57a528bccd6b6f/invoke.js';

        const adContainer = document.getElementById('container-2d0ce4709cffb0560e57a528bccd6b6f');
        if (adContainer) {
            adContainer.innerHTML = ''; // Limpa o container antes de adicionar o script
            adContainer.appendChild(script);
        }

        return () => {
            if (adContainer) {
                adContainer.innerHTML = '';
            }
        };
    }, []);

    return (
        <ErrorBoundary>
            <div id="container-2d0ce4709cffb0560e57a528bccd6b6f" className="adsterra-card"></div>
        </ErrorBoundary>
    );
};

export default AdsterraContainer;