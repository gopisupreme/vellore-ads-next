'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { accountCleared, accountRequested, selectAccountForm } from '@/store/reducers/accountSlice';
import { AuthField } from './AuthField';
import FormNotice from './FormNotice';
import { formTitle, redButton, textLink } from './formStyles';

/** Asks for a link to choose a new password (PHP site: users/forgot_pass). */
export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const { sending, result, error } = useSelector((state) => selectAccountForm(state, 'forgot'));

  useEffect(() => () => dispatch(accountCleared('forgot')), [dispatch]);

  function submit(e) {
    e.preventDefault();
    dispatch(accountRequested('forgot', { email: new FormData(e.currentTarget).get('email') }));
  }

  return (
    <>
      <h1 className={formTitle}>Forgot Password</h1>
      <p className="mb-4 text-ink-body">Enter your account&apos;s email address and we&apos;ll send you a link to choose a new password.</p>
      <FormNotice result={result} error={error} />
      <form onSubmit={submit} className="space-y-2.5">
        <AuthField label="Email Address" name="email" type="email" autoComplete="email" required autoFocus />
        <button type="submit" disabled={sending} className={redButton}>
          {sending ? 'Sending…' : 'Submit'}
        </button>
      </form>
      <p className="mt-5 text-ink-body">
        Are you a already member ? <Link href="/login/" className={textLink}>Login</Link>
        <span className="mx-1.5 text-ink-faint">|</span>
        <Link href="/register/" className={textLink}>Create an account</Link>
      </p>
    </>
  );
}
