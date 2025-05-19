import React from 'react';
import { ADS_CONFIG } from '../../config/ads';
import AdsterraProxy from '../AdsterraProxy';
import './adsterra-top-banner.css';

const AdsterraTopBanner = () => {
    return (
        <AdsterraProxy
            adId={ADS_CONFIG.adsterra.topBanner.id}
            format="iframe"
            height={90}
            width={728}
            containerId={`container-${ADS_CONFIG.adsterra.topBanner.id}`}
        />
    );
};

export default AdsterraTopBanner; 