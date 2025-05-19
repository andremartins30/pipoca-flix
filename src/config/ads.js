export const ADS_CONFIG = {
    enabled: process.env.NODE_ENV === 'production',
    adSense: {
        client: 'ca-pub-4417304823219883',
        enabled: true
    },
    adsterra: {
        container: {
            id: '2d0ce4709cffb0560e57a528bccd6b6f',
            maxRetries: 3,
            retryDelay: 1000
        },
        banner: {
            id: '3a10b17c7da86ab4fb26cdb415db2364',
            maxRetries: 3,
            retryDelay: 1000
        },
        sideBanner: {
            id: 'b0cd5c44cd06d434115251aaae49c21e',
            maxRetries: 3,
            retryDelay: 1000
        },
        topBanner: {
            id: '6ebf48f2af8544eb09fc914558246433',
            maxRetries: 3,
            retryDelay: 1000
        }
    }
}; 