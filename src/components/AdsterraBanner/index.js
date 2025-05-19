import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { ADS_CONFIG } from '../../config/ads';
import AdsterraProxy from '../AdsterraProxy';
import './adsterra-banner.css';

const AdsterraBanner = () => {
    const config = ADS_CONFIG.adsterra.banner;
    return (
        <ErrorBoundary>
            <AdsterraProxy
                adId={config.id}
                format={config.format}
                height={config.height}
                width={config.width}
                containerId={`banner-${config.id}`}
            />
        </ErrorBoundary>
    );
};

export default AdsterraBanner; 