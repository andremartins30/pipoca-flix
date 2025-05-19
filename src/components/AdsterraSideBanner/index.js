import React, { useEffect } from 'react';
import './adsterra-side-banner.css';

const AdsterraSideBanner = () => {
    useEffect(() => {
        console.log('[AdsterraSideBanner] Iniciando carregamento do banner...');

        try {
            // Carrega o script do anúncio
            window.atOptions = {
                'key': 'b0cd5c44cd06d434115251aaae49c21e',
                'format': 'iframe',
                'height': 300,
                'width': 160,
                'params': {}
            };
            console.log('[AdsterraSideBanner] Configurações definidas:', window.atOptions);

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//www.highperformanceformat.com/b0cd5c44cd06d434115251aaae49c21e/invoke.js';
            script.async = true;

            script.onload = () => {
                console.log('[AdsterraSideBanner] Script carregado com sucesso');
            };

            script.onerror = (error) => {
                console.error('[AdsterraSideBanner] Erro ao carregar script:', error);
            };

            document.body.appendChild(script);
            console.log('[AdsterraSideBanner] Script adicionado ao DOM');

            // Limpa o script quando o componente for desmontado
            return () => {
                console.log('[AdsterraSideBanner] Removendo script...');
                if (script.parentNode) {
                    document.body.removeChild(script);
                    console.log('[AdsterraSideBanner] Script removido com sucesso');
                }
            };
        } catch (error) {
            console.error('[AdsterraSideBanner] Erro ao inicializar banner:', error);
        }
    }, []);

    return (
        <div className="adsterra-side-banner-container">
            <div id="container-b0cd5c44cd06d434115251aaae49c21e"></div>
        </div>
    );
};

export default AdsterraSideBanner; 