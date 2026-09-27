'use client';
/* eslint-disable @next/next/no-img-element -- static export has no image server */

import { useState } from 'react';

const DEFAULT = '/assets/images/placeholder.svg';

/** An <img> that loads lazily and swaps to `fallback` if the file is missing. */
export default function SafeImage({ src, fallback = DEFAULT, alt = '', ...props }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed || !src ? fallback : src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
