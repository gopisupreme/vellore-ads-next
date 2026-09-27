'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import usePublicSite from '@/hooks/usePublicSite';
import { accountCleared, accountRequested, selectAccountForm } from '@/store/reducers/accountSlice';
import AuthBackground from './AuthBackground';
import { AuthField, PasswordField } from './AuthField';
import FormNotice from './FormNotice';
import Recaptcha from './Recaptcha';
import { textLink } from './formStyles';

/** The register page's tabs: which kind of account is created (users.u_type). */
const TABS = [
  { type: 'listing', label: 'User' },
  { type: 'customer', label: 'Customer' },
];

/** Create an Account (PHP site: users/register). */
export default function RegisterForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { site } = usePublicSite();
  const { sending, result, error } = useSelector((state) => selectAccountForm(state, 'register'));
  const [accountType, setAccountType] = useState('listing');
  const [captcha, setCaptcha] = useState('');
  const onCaptcha = useCallback((answer) => setCaptcha(answer), []);

  // a new visit starts empty (an earlier "you are registered" is not a new one)
  useEffect(() => {
    dispatch(accountCleared('register'));
  }, [dispatch]);

  // registered: on to Sign In, which shows the message (as the PHP site did)
  useEffect(() => {
    if (result) router.push('/login/');
  }, [result, router]);

  function submit(e) {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.currentTarget));
    dispatch(accountRequested('register', { ...fields, accountType, captcha }));
  }

  const inputRules = { autoComplete: 'off', required: true };

  return (
    <AuthBackground>
      <div className="mx-auto max-w-[720px] rounded-[5px] bg-white px-5 py-10 text-center shadow-[0_4px_20px_rgba(0,0,0,.8)] sm:px-[50px] sm:pt-[60px] sm:pb-[70px]">
        <h1 className="font-heading text-[32px] font-bold text-ink sm:text-[42px]">Create an Account</h1>
        <p className="mt-2 text-lg text-ink-body">It&apos;s free and always will be.</p>

        <div role="tablist" aria-label="Account type" className="mt-8 flex">
          {TABS.map((tab) => (
            <button
              key={tab.type}
              role="tab"
              type="button"
              aria-selected={accountType === tab.type}
              onClick={() => setAccountType(tab.type)}
              className={`w-40 border-b-2 py-3 text-sm uppercase transition-colors ${
                accountType === tab.type ? 'border-[#ee6e73] text-[#ee6e73]' : 'border-transparent text-[#26a69a] hover:text-[#1e8d83]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-8 space-y-2.5 text-left" aria-label={`Create a ${accountType === 'customer' ? 'customer' : 'user'} account`}>
          <FormNotice error={error} />
          <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-4">
            <AuthField label="First Name" name="firstName" maxLength={60} autoComplete="given-name" required />
            <AuthField label="Last Name" name="lastName" maxLength={60} autoComplete="family-name" required />
          </div>
          <AuthField label="Mobile Number" name="mobile" type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} title="Enter 10 digit valid mobile number" {...inputRules} />
          <AuthField label="Email Address" name="email" type="email" autoComplete="email" required />
          <PasswordField name="password" autoComplete="new-password" minLength={6} maxLength={15} title="6 to 15 characters" required />
          <PasswordField label="Confirm Password" name="confirmPassword" autoComplete="new-password" minLength={6} maxLength={15} required />
          {site?.recaptchaSiteKey && <Recaptcha siteKey={site.recaptchaSiteKey} onChange={onCaptcha} resetKey={error} />}
          <button
            type="submit"
            disabled={sending}
            className="h-[45px] w-full bg-linear-to-b from-[#f96d52] to-[#f4364f] text-lg text-white uppercase transition hover:brightness-105 disabled:cursor-wait disabled:opacity-60"
          >
            {sending ? 'Registering…' : 'Register'}
          </button>
        </form>
        <p className="mt-5 text-lg text-ink-body">
          Are you a already member ? <Link href="/login/" className={`text-brand-600 ${textLink}`}>Click to Login</Link>
        </p>
      </div>
    </AuthBackground>
  );
}
