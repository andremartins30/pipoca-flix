import React, { useEffect } from 'react';
import './adsterra-side-banner.css';

const AdsterraSideBanner = () => {
    useEffect(() => {
        // Carrega o script do anúncio
        window.atOptions = {
            'key': 'b0cd5c44cd06d434115251aaae49c21e',
            'format': 'iframe',
            'height': 300,
            'width': 160,
            'params': {}
        };

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//www.highperformanceformat.com/b0cd5c44cd06d434115251aaae49c21e/invoke.js';
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
        <div className="adsterra-side-banner-container">
            <div id="container-b0cd5c44cd06d434115251aaae49c21e"></div>
        </div>
    );
};

export default AdsterraSideBanner; 