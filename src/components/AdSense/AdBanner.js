import React from 'react';
import AdSense from './index';

export const AdTop = () => <AdSense adSlot="1111111111" style={{ height: '20px' }} />;
export const AdSidebar = () => <AdSense adSlot="2222222222" format="vertical" style={{ height: '600px', width: '160px' }} />;
export const AdInArticle = () => <AdSense adSlot="3333333333" format="fluid" style={{ display: 'block' }} />; 