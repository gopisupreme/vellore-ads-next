/* eslint-disable @next/next/no-img-element -- static export has no image server */

const DEFAULT_AVATAR = '/assets/images/users/default.png';

/** A round user photo; falls back to the PHP site's default picture. */
export default function Avatar({ src, name = '', className = 'size-10' }) {
  return (
    <img
      src={src || DEFAULT_AVATAR}
      alt={name}
      className={`shrink-0 rounded-full bg-slate-200 object-cover ${className}`}
    />
  );
}
