import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { ADS_CONFIG } from '../../config/ads';
import AdsterraProxy from '../AdsterraProxy';
import './adsterra-container.css';

const AdsterraContainer = () => {
    return (
        <ErrorBoundary>
            <AdsterraProxy
                adId={ADS_CONFIG.adsterra.container.id}
                format="iframe"
                height={250}
                width={300}
                containerId={`container-${ADS_CONFIG.adsterra.container.id}`}
            />
        </ErrorBoundary>
    );
};

export default AdsterraContainer; 