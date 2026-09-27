'use client';

import { useEffect, useRef } from 'react';

const SCRIPT = 'https://www.google.com/recaptcha/api.js?render=explicit';

/** Loads Google's reCAPTCHA script once for the page. */
function loadScript() {
  if (typeof window === 'undefined') return Promise.reject();
  if (!window.recaptchaReady) {
    window.recaptchaReady = new Promise((resolve) => {
      const tag = document.createElement('script');
      tag.src = SCRIPT;
      tag.async = true;
      tag.onload = () => window.grecaptcha.ready(resolve);
      document.head.appendChild(tag);
    });
  }
  return window.recaptchaReady;
}

/**
 * Google's "I'm not a robot" box. `onChange` gets the answer to send with
 * the form ('' when it expires). Change `resetKey` to show a fresh box.
 */
export default function Recaptcha({ siteKey, onChange, resetKey }) {
  const box = useRef(null);

  useEffect(() => {
    let widget = null;
    let cancelled = false;
    const el = box.current;
    loadScript().then(() => {
      if (cancelled || !el) return;
      widget = window.grecaptcha.render(el, {
        sitekey: siteKey,
        callback: onChange,
        'expired-callback': () => onChange(''),
      });
    });
    return () => {
      cancelled = true;
      if (widget !== null) window.grecaptcha.reset(widget);
      el.replaceChildren();
    };
  }, [siteKey, onChange, resetKey]);

  return <div ref={box} className="min-h-[78px]" />;
}
