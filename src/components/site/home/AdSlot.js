'use client';

import { useEffect, useState } from 'react';
import { SafeImage } from '@/components/site/ui';

/**
 * A banner ad: the paid ads running now (api: running_ads), one after another,
 * or the site's own `fallback` ad while none is running. Marked "Ad".
 */
export default function AdSlot({ ads = [], fallback, className = '' }) {
  const slides = ads.length ? ads : [fallback];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const ad = slides[index % slides.length];
  return (
    <div className={`relative ${className}`}>
      <span className="absolute top-0 left-0 z-10 bg-[#e3342f] px-1.5 text-xs leading-5 text-white">Ad</span>
      <a href={ad.url} target="_blank" rel="noreferrer sponsored" title={ad.title} className="block">
        <SafeImage src={ad.image} alt={ad.title} fallback={fallback.image} className="mx-auto w-full" />
      </a>
    </div>
  );
}
