'use client';

import { CSSProperties, useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdsenseAdProps = {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  style?: CSSProperties;
  className?: string;
};

export default function AdsenseAd({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style,
  className,
}: AdsenseAdProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    if (typeof window === 'undefined') return;
    if (!adRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initializedRef.current = true;
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div
      className={className}
      style={{
        width: '100%',
        overflow: 'hidden',
        textAlign: 'center',
        ...style,
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5102546518342948"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}