'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui';
import SafeImage from './SafeImage';

/** A YouTube video that shows its picture until played (loads the player only then). */
export default function YouTubeVideo({ id, title = 'Video' }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`} className="group relative block aspect-video w-full overflow-hidden bg-black">
      <SafeImage src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className="size-full object-cover" />
      <span className="absolute top-1/2 left-1/2 grid h-[60px] w-[90px] -translate-1/2 place-items-center rounded-lg bg-[#212121]/80 text-3xl text-white transition-colors group-hover:bg-[#f00]">
        <Icon name="play" />
      </span>
    </button>
  );
}
