import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** Where `npm run dev` runs the PHP API (see package.json). */
const PHP_DEV_SERVER = 'http://127.0.0.1:8000';

/**
 * `npm run build` makes a static site in out/ (plain HTML/JS, uploaded by FTP
 * next to the PHP API in api/). No Node server runs on the hosting.
 *
 * @param {string} phase
 * @returns {import('next').NextConfig}
 */
export default function nextConfig(phase) {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // while developing, /api/* is answered by PHP's built-in server
    return {
      async rewrites() {
        return [{ source: '/api/:path*', destination: `${PHP_DEV_SERVER}/api/:path*` }];
      },
    };
  }
  return {
    output: 'export',
    // /about -> out/about/index.html, which Apache serves without extra rules
    trailingSlash: true,
    // no image server on static hosting
    images: { unoptimized: true },
  };
}
