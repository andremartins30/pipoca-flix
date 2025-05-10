import React, { useEffect } from 'react'
import './adsense.css'

const AdSense = ({ adSlot, format = 'auto', responsive = true, style = {} }) => {
    useEffect(() => {
        // Tenta carregar os anúncios quando o componente é montado
        try {
            if (window.adsbygoogle) {
                window.adsbygoogle.push({});
            }
        } catch (e) {
            console.error('Erro ao carregar anúncios:', e);
        }
    }, []);

    // Determina as classes CSS com base nos parâmetros
    const classes = `adsbygoogle ${responsive ? 'adsbygoogle-responsive' : ''}`;

    return (
        <div className="adsense-container">
            <ins
                className={classes}
                style={style}
                data-ad-client="ca-pub-4417304823219883" // Substitua pelo seu ID de publisher
                data-ad-slot={adSlot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
            />
        </div>
    );
};

export default AdSense; 