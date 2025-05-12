import React, { useEffect, useRef } from 'react'
import './adsense.css'

const AdSense = ({ adSlot, format = 'auto', responsive = true, style = {} }) => {
    const adRef = useRef(null);
    const pushedRef = useRef(false); // Flag para evitar múltiplos push

    useEffect(() => {
        const tryPushAd = () => {
            if (window.adsbygoogle && adRef.current && !pushedRef.current) {
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    pushedRef.current = true;
                    console.log('AdSense push realizado');
                } catch (e) {
                    console.error('Erro ao carregar anúncios:', e);
                }
            } else if (!pushedRef.current) {
                setTimeout(tryPushAd, 500);
            }
        };
        tryPushAd();
    }, []);

    // Garante largura mínima para anúncios fluidos/responsivos
    const minWidth = (format === 'fluid' || responsive) ? 250 : undefined;
    const classes = `adsbygoogle ${responsive ? 'adsbygoogle-responsive' : ''}`;
    return (
        <div className="adsense-container" style={minWidth ? { minWidth } : {}}>
            <ins
                ref={adRef}
                className={classes}
                style={{ display: 'block', minHeight: 50, minWidth, ...style }}
                data-ad-client="ca-pub-4417304823219883"
                data-ad-slot={adSlot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
            />
        </div>
    );
};

export default AdSense;