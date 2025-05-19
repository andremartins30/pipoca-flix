import React, { useEffect } from 'react';
import './adsterra-side-banner.css';

const AdsterraSideBanner = () => {
    useEffect(() => {
        // Carrega o script do anúncio
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
            atOptions = {
                'key' : 'b0cd5c44cd06d434115251aaae49c21e',
                'format' : 'iframe',
                'height' : 300,
                'width' : 160,
                'params' : {}
            };
        `;
        document.body.appendChild(script);

        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = '//www.highperformanceformat.com/b0cd5c44cd06d434115251aaae49c21e/invoke.js';
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
        <div className="adsterra-side-banner-container">
            <div id="container-b0cd5c44cd06d434115251aaae49c21e"></div>
        </div>
    );
};

export default AdsterraSideBanner; 