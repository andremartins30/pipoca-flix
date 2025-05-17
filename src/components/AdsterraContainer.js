import React, { useEffect } from 'react';

const AdsterraContainer = () => {
    useEffect(() => {
        // Carrega o script do Adsterra
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = '//pl26668277.profitableratecpm.com/2d0ce4709cffb0560e57a528bccd6b6f/invoke.js';
        document.body.appendChild(script);

        return () => {
            // Limpa o script quando o componente for desmontado
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="adsterra-container">
            <div id="container-2d0ce4709cffb0560e57a528bccd6b6f"></div>
        </div>
    );
};

export default AdsterraContainer; 