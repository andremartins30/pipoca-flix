import { useEffect } from 'react';

const AdsterraPopUnder = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//pl26689083.profitableratecpm.com/dc/01/15/dc0115621904351628ceb5b8d026165f.js';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default AdsterraPopUnder;
