'use client';

import { useEffect, useRef } from 'react';
import Button from './Button';

/**
 * Asks before doing something. Shown while `open`; `onConfirm` runs the
 * action, `onCancel` (also Escape or a click outside) closes it.
 */
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Yes, continue',
  tone = 'primary',
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    confirmRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" className="w-full max-w-md overflow-hidden rounded bg-white shadow-xl">
        <h2 id="confirm-title" className="bg-navy-800 px-5 py-4 font-heading text-lg font-bold text-white">
          {title}
        </h2>
        <div className="px-5 py-5 text-sm">{message}</div>
        <div className="flex justify-end gap-2 border-t border-line px-5 py-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button ref={confirmRef} variant={tone} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
