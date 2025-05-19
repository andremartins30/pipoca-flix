import React, { useEffect } from 'react';
import './adsterra-top-banner.css';

const AdsterraTopBanner = () => {
    useEffect(() => {
        // Carrega o script do anúncio
        window.atOptions = {
            'key': '6ebf48f2af8544eb09fc914558246433',
            'format': 'iframe',
            'height': 90,
            'width': 728,
            'params': {}
        };

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//www.highperformanceformat.com/6ebf48f2af8544eb09fc914558246433/invoke.js';
        script.async = true;
        document.body.appendChild(script);

        // Limpa o script quando o componente for desmontado
        return () => {
            if (script.parentNode) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="adsterra-top-banner-container">
            <div id="container-6ebf48f2af8544eb09fc914558246433"></div>
        </div>
    );
};

export default AdsterraTopBanner; 