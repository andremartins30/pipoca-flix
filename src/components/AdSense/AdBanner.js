import React from 'react';
import AdSense from './index';

// Cada componente usa um slot ID diferente
export const AdTop = () => <AdSense adSlot="2797177392" style={{ height: '20px' }} />;
export const AdSidebar = () => <AdSense adSlot="3456789123" format="vertical" style={{ height: '600px', width: '160px' }} />;
export const AdInArticle = () => <AdSense adSlot="4567891234" format="fluid" style={{ display: 'block' }} />;