import React, { useEffect } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import './adsterra-banner.css';

const AdsterraBanner = () => {

    useEffect(() => {
        const scriptOptions = document.createElement('script');
        scriptOptions.type = 'text/javascript';
        scriptOptions.innerHTML = `
            atOptions = {
                'key': '3a10b17c7da86ab4fb26cdb415db2364',
                'format' : 'iframe',
                'height' : 60,
                'width' : 468,
                'params' : { }
            };
        `;

        const scriptInvoke = document.createElement('script');
        scriptInvoke.type = 'text/javascript';
        scriptInvoke.src = '//www.highperformanceformat.com/3a10b17c7da86ab4fb26cdb415db2364/invoke.js';

        const adContainer = document.getElementById('adsterra-banner-container');
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
        <ErrorBoundary>
            <div id="adsterra-banner-container"></div>
        </ErrorBoundary>
    );
};

export default AdsterraBanner;