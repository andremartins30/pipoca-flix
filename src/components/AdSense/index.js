import React, { useEffect, useRef } from 'react'
import ErrorBoundary from '../ErrorBoundary'
import './adsense.css'

const AdSense = ({ adSlot, format = 'auto', responsive = true, style = {} }) => {
    const adRef = useRef(null);
    const pushedRef = useRef(false);

    useEffect(() => {
        const tryPushAd = () => {
            if (window.adsbygoogle && adRef.current && !pushedRef.current) {
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    pushedRef.current = true;
                } catch (e) {
                    console.warn('Erro ao carregar anúncios:', e);
                }
            } else if (!pushedRef.current) {
                setTimeout(tryPushAd, 500);
            }
        };

        // Adiciona tratamento de erro global para scripts externos
        const handleScriptError = (e) => {
            if (e.target.tagName === 'SCRIPT') {
                console.warn('Erro ao carregar script externo:', e);
                e.preventDefault();
            }
        };

        window.addEventListener('error', handleScriptError, true);
        tryPushAd();

        return () => {
            window.removeEventListener('error', handleScriptError, true);
        };
    }, []);

    return (
        <ErrorBoundary>
            <div className="adsense-container" style={{ minWidth: (format === 'fluid' || responsive) ? 250 : undefined }}>
                <ins
                    ref={adRef}
                    className={`adsbygoogle ${responsive ? 'adsbygoogle-responsive' : ''}`}
                    style={{ display: 'block', minHeight: 50, ...style }}
                    data-ad-client="ca-pub-4417304823219883"
                    data-ad-slot={adSlot}
                    data-ad-format={format}
                    data-full-width-responsive={responsive ? "true" : "false"}
                />
            </div>
        </ErrorBoundary>
    );
};

export default AdSense;