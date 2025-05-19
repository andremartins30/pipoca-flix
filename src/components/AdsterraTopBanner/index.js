import React, { useEffect } from 'react';
import './adsterra-top-banner.css';

const AdsterraTopBanner = () => {

    useEffect(() => {
        const scriptOptions = document.createElement('script');
        scriptOptions.type = 'text/javascript';
        scriptOptions.innerHTML = `
            atOptions = {
                'key' : '6ebf48f2af8544eb09fc914558246433',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
            };
        `;

        const scriptInvoke = document.createElement('script');
        scriptInvoke.type = 'text/javascript';
        scriptInvoke.src = '//www.highperformanceformat.com/6ebf48f2af8544eb09fc914558246433/invoke.js';

        const adContainer = document.getElementById('adsterra-top-banner-container');
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
        <div id="adsterra-top-banner-container"></div>
    );
};

export default AdsterraTopBanner;