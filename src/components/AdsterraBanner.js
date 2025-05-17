import React, { useEffect } from 'react';

const AdsterraBanner = () => {
    useEffect(() => {
        // Configuração do anúncio
        window.atOptions = {
            'key': '3a10b17c7da86ab4fb26cdb415db2364',
            'format': 'iframe',
            'height': 60,
            'width': 468,
            'params': {}
        };

        // Carrega o script do Adsterra
        const script = document.createElement('script');
        script.src = '//www.highperformanceformat.com/3a10b17c7da86ab4fb26cdb415db2364/invoke.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Limpa o script quando o componente for desmontado
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="adsterra-banner">
            {/* O anúncio será inserido aqui */}
        </div>
    );
};

export default AdsterraBanner; 