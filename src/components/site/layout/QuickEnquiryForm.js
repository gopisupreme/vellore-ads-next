'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@/components/ui';
import { enquiryReset, enquirySubmitted, selectEnquiry } from '@/store/reducers/enquirySlice';

const FIELDS = [
  { name: 'name', label: 'Name', icon: 'user', type: 'text', autoComplete: 'name', maxLength: 75 },
  { name: 'mobile', label: 'Mobile', icon: 'phone', type: 'tel', autoComplete: 'tel-national', pattern: '[6-9][0-9]{9}', maxLength: 10, title: 'Enter 10 digit valid mobile number' },
  { name: 'email', label: 'Email', icon: 'envelope', type: 'email', autoComplete: 'email', maxLength: 150 },
  { name: 'service', label: 'Enter Your Service', icon: 'list-ul', type: 'text', maxLength: 500 },
];

/**
 * Name, mobile, email and service, sent to api/quick-request.php. Used by the
 * home page's "Quick service request" and the footer's Quick Enquiry pop-up.
 */
export default function QuickEnquiryForm({ dark = false }) {
  const dispatch = useDispatch();
  const { sending, message, error } = useSelector(selectEnquiry);

  // the thank-you note fades after a while, as on the PHP site
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => dispatch(enquiryReset()), 6000);
    return () => clearTimeout(timer);
  }, [message, dispatch]);

  function submit(e) {
    e.preventDefault();
    dispatch(enquirySubmitted(Object.fromEntries(new FormData(e.currentTarget))));
  }

  return (
    // a new key once sent gives an empty form
    <form key={message ? 'sent' : 'new'} onSubmit={submit} className="space-y-6">
      {message && <p role="status" className={`text-sm ${dark ? 'text-emerald-300' : 'text-emerald-700'}`}>{message}</p>}
      {error && <p role="alert" className={`text-sm ${dark ? 'text-red-300' : 'text-red-600'}`}>{error}</p>}
      {FIELDS.map(({ name, label, icon, ...input }) => (
        <label key={name} className="relative block">
          <span className="sr-only">{label}</span>
          <Icon name={icon} className="pointer-events-none absolute top-1/2 left-4 w-4 -translate-y-1/2 text-center text-[#445]" />
          <input
            name={name}
            placeholder={label}
            required
            className="h-10 w-full rounded-[2px] border border-[#ccc] bg-white pr-3 pl-12 text-[15px] text-ink placeholder:text-ink focus:border-brand-500 focus:outline-none"
            {...input}
          />
        </label>
      ))}
      <button type="submit" disabled={sending} className="h-9 w-full rounded-[2px] bg-label-primary text-sm font-medium text-white uppercase hover:bg-[#286090] disabled:opacity-60">
        {sending ? 'Sending…' : 'Send Request'}
      </button>
    </form>
  );
}
