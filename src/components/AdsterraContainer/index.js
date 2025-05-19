import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { ADS_CONFIG } from '../../config/ads';
import AdsterraProxy from '../AdsterraProxy';
import './adsterra-container.css';

const AdsterraContainer = () => {
    const config = ADS_CONFIG.adsterra.container;
    return (
        <ErrorBoundary>
            <AdsterraProxy
                adId={config.id}
                format={config.format}
                height={config.height}
                width={config.width}
                containerId={`container-${config.id}`}
            />
        </ErrorBoundary>
    );
};

export default AdsterraContainer; 