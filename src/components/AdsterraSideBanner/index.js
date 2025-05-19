import React, { useEffect } from 'react';
import './adsterra-side-banner.css';

const AdsterraSideBanner = () => {

    useEffect(() => {
        const scriptOptions = document.createElement('script');
        scriptOptions.type = 'text/javascript';
        scriptOptions.innerHTML = `
            atOptions = {
                'key' : 'b0cd5c44cd06d434115251aaae49c21e',
                'format' : 'iframe',
                'height' : 300,
                'width' : 160,
                'params' : {}
            };
        `;

        const scriptInvoke = document.createElement('script');
        scriptInvoke.type = 'text/javascript';
        scriptInvoke.src = '//www.highperformanceformat.com/b0cd5c44cd06d434115251aaae49c21e/invoke.js';

        const adContainer = document.getElementById('adsterra-side-banner-container');
        if (adContainer) {
            adContainer.appendChild(scriptOptions);
            adContainer.appendChild(scriptInvoke);
        }

        return () => {
            if (adContainer) {
                adContainer.innerHTML = '';
            }
        };
    }, []);

    return (
        <div id="adsterra-side-banner-container"></div>
    );
};

export default AdsterraSideBanner;