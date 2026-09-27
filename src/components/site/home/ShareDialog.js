'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui';
import { Dialog } from '@/components/site/ui';

/** "Share now": copy a page's address or send it to a social network. */
export default function ShareDialog({ item, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!item) return null;
  const url = encodeURIComponent(item.url);
  const text = encodeURIComponent(item.title);
  const targets = [
    ['facebook', `https://www.facebook.com/sharer/sharer.php?u=${url}`, 'bg-[#3b5998]'],
    ['twitter', `https://twitter.com/intent/tweet?url=${url}&text=${text}`, 'bg-[#1da1f2]'],
    ['whatsapp', `https://api.whatsapp.com/send?text=${text}%20${url}`, 'bg-[#25d366]'],
    ['linkedin', `https://www.linkedin.com/sharing/share-offsite/?url=${url}`, 'bg-[#0077b5]'],
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Dialog open title="Share now" onClose={onClose}>
      <p className="mb-3 font-medium text-ink">{item.title}</p>
      <div className="flex">
        <input readOnly value={item.url} aria-label="Address of the page" onFocus={(e) => e.target.select()} className="min-w-0 flex-1 rounded-l border border-r-0 border-slate-300 px-3 py-2 text-sm" />
        <button type="button" onClick={copy} className="rounded-r bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="mt-4 flex gap-2">
        {targets.map(([icon, href, bg]) => (
          <a key={icon} href={href} target="_blank" rel="noreferrer" aria-label={`Share on ${icon}`} className={`grid size-10 place-items-center rounded-full text-lg text-white hover:brightness-110 ${bg}`}>
            <Icon name={icon} />
          </a>
        ))}
      </div>
    </Dialog>
  );
}
