'use client';

import { useId, useState } from 'react';
import { Icon } from '@/components/ui';

const INPUT = 'h-[45px] w-full border border-[#c9c9c9] bg-white px-2.5 text-base text-ink placeholder:text-[#555] focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none';

/** A form box with its placeholder as the (screen-reader) label, as on the PHP site. */
export function AuthField({ label, className = '', ...input }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input id={id} placeholder={label} className={INPUT} {...input} />
    </div>
  );
}

/** A password box with an eye button that shows what was typed. */
export function PasswordField({ label = 'Password', className = '', ...input }) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input id={id} type={visible ? 'text' : 'password'} placeholder={label} className={`${INPUT} pr-11`} {...input} />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 grid w-11 place-items-center text-[#555] hover:text-ink"
      >
        <Icon name={visible ? 'eye-slash' : 'eye'} />
      </button>
    </div>
  );
}
