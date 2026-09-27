'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui';

const ARROWS = {
  // grey circle at the right (PHP site's category strip and products)
  plain: 'size-11 bg-[#e6e6e6] text-2xl text-[#777] hover:bg-[#d8d8d8]',
  // blue circles on both sides (attractions, Explore More Ads)
  blue: 'size-9 bg-[#2f80ed] text-xl text-white shadow hover:bg-[#1f6fdc]',
};

/**
 * A row that scrolls sideways, with arrow buttons while there is more to see.
 * Children are the slides; give them a width (e.g. basis-1/5).
 */
export default function Carousel({ children, label, arrows = 'plain', className = '', trackClassName = 'gap-4' }) {
  const track = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    const el = track.current;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const scroll = (direction) => {
    const el = track.current;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const button = `absolute top-1/2 z-10 grid -translate-y-1/2 place-items-center rounded-full transition-opacity ${ARROWS[arrows]}`;

  return (
    <div className={`relative ${className}`} role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={track} onScroll={measure} className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth ${trackClassName}`}>
        {children}
      </div>
      {!edges.start && (
        <button type="button" aria-label="Previous" onClick={() => scroll(-1)} className={`${button} -left-3 lg:-left-4`}>
          <Icon name="angle-left" />
        </button>
      )}
      {!edges.end && (
        <button type="button" aria-label="Next" onClick={() => scroll(1)} className={`${button} -right-3 lg:-right-12`}>
          <Icon name="angle-right" />
        </button>
      )}
    </div>
  );
}
