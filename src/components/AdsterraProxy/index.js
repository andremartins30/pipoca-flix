import React from 'react';
import AdsterraProxy from '../AdsterraProxy';
import { ADS_CONFIG } from '../../config/ads';

const AdsterraBanner = () => {
    const config = ADS_CONFIG.adsterra.banner;
    return (
        <AdsterraProxy
            adId={config.id}
            format={config.format}
            height={config.height}
            width={config.width}
            containerId={`banner-${config.id}`}
        />
    );
};

export default AdsterraBanner;