import React, { useEffect } from 'react';
import './adsterra-top-banner.css';

const AdsterraTopBanner = () => {
    useEffect(() => {
        const loadAdsterraScript = () => {
            // Remove scripts existentes
            const existingScripts = document.querySelectorAll('script[src*="highperformanceformat.com"]');
            existingScripts.forEach(script => script.remove());

            // Remove configurações existentes
            if (window.atOptions) {
                delete window.atOptions;
            }

            // Cria o container do banner
            const container = document.getElementById('adsterra-top-banner-container');
            if (container) {
                container.innerHTML = '';
            }

            // Adiciona a configuração
            window.atOptions = {
                'key': 'dd8218a0080f0b1d7bd07abb38ca6316',
                'format': 'iframe',
                'height': 50,
                'width': 320,
                'params': {}
            };

            // Cria e adiciona o script
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//www.highperformanceformat.com/dd8218a0080f0b1d7bd07abb38ca6316/invoke.js';
            script.async = true;
            script.defer = true;

            // Adiciona o script ao body em vez do head
            document.body.appendChild(script);
        };

        // Carrega o script após um pequeno delay
        const timer = setTimeout(loadAdsterraScript, 1000);

        return () => {
            clearTimeout(timer);
            // Limpa scripts ao desmontar
            const scripts = document.querySelectorAll('script[src*="highperformanceformat.com"]');
            scripts.forEach(script => script.remove());
            if (window.atOptions) {
                delete window.atOptions;
            }
        };
    }, []);

    return (
        <div id="adsterra-top-banner-container" className="adsterra-top-banner">
            <div id="container-dd8218a0080f0b1d7bd07abb38ca6316"></div>
        </div>
    );
};

export default AdsterraTopBanner;