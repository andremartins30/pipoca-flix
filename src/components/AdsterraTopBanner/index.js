import React, { useEffect } from 'react';
import './adsterra-top-banner.css';

const AdsterraTopBanner = () => {
    useEffect(() => {
        // Carrega o script do anúncio
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
            atOptions = {
                'key' : '6ebf48f2af8544eb09fc914558246433',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
            };
        `;
        document.body.appendChild(script);

        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = '//www.highperformanceformat.com/6ebf48f2af8544eb09fc914558246433/invoke.js';
        document.body.appendChild(script2);

        // Limpa os scripts quando o componente for desmontado
        return () => {
            if (script.parentNode) {
                document.body.removeChild(script);
            }
            if (script2.parentNode) {
                document.body.removeChild(script2);
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