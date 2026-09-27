'use client';

import { useEffect, useId } from 'react';
import { Icon } from '@/components/ui';

/** A pop-up box with a navy title bar. Escape, a click outside or × closes it. */
export default function Dialog({ open, title, onClose, children, className = 'max-w-md' }) {
  const titleId = useId();
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-slate-900/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className={`w-full overflow-hidden rounded bg-white shadow-2xl ${className}`}>
        <div className="flex items-center justify-between bg-navy-800 px-5 py-4">
          <h2 id={titleId} className="font-heading text-lg font-bold text-white">
            {title}
          </h2>
          <button type="button" aria-label="Close" onClick={onClose} className="text-xl text-white/80 hover:text-white">
            <Icon name="times" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
