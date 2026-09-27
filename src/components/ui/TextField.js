import { useId } from 'react';
import Icon from './Icon';

/** A labelled input. `icon` is a Font Awesome name shown inside the field. */
export default function TextField({ label, icon, error, className = '', ...props }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <Icon name={icon} />
          </span>
        )}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          className={`h-11 w-full rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none ${icon ? 'pl-10' : 'pl-3'} pr-3`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
