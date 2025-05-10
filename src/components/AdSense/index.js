import React, { useEffect, useRef } from 'react'
import './adsense.css'

const AdSense = ({ adSlot, format = 'auto', responsive = true, style = {} }) => {
    const adRef = useRef(null);

    useEffect(() => {
        // Tenta carregar os anúncios quando o componente é montado
        try {
            if (window.adsbygoogle && adRef.current) {
                // Push específico para este elemento de anúncio
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error('Erro ao carregar anúncios:', e);
        }
    }, []);

    // Determina as classes CSS com base nos parâmetros
    const classes = `adsbygoogle ${responsive ? 'adsbygoogle-responsive' : ''}`; return (
        <div className="adsense-container">
            <ins
                ref={adRef}
                className={classes}
                style={style}
                data-ad-client="ca-pub-4417304823219883"
                data-ad-slot={adSlot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
            />
        </div>
    );
};

export default AdSense; 