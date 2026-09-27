'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { accountCleared, accountRequested, selectAccountForm } from '@/store/reducers/accountSlice';
import { PasswordField } from './AuthField';
import FormNotice from './FormNotice';
import { formTitle, redButton, textLink } from './formStyles';

/** Chooses a new password with the emailed link (?token=...). */
export default function ResetPasswordForm() {
  const token = useSearchParams().get('token') ?? '';
  const dispatch = useDispatch();
  const { sending, result, error } = useSelector((state) => selectAccountForm(state, 'reset'));

  useEffect(() => () => dispatch(accountCleared('reset')), [dispatch]);

  function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    dispatch(accountRequested('reset', { token, password: form.get('password'), confirmPassword: form.get('confirmPassword') }));
  }

  return (
    <>
      <h1 className={formTitle}>Choose a new password</h1>
      <FormNotice result={result} error={error} />
      {result ? (
        <Link href="/login/" className={redButton}>Sign In</Link>
      ) : (
        <form onSubmit={submit} className="space-y-2.5">
          <PasswordField label="New Password" name="password" autoComplete="new-password" minLength={6} maxLength={15} required autoFocus />
          <PasswordField label="Confirm Password" name="confirmPassword" autoComplete="new-password" minLength={6} maxLength={15} required />
          <p className="text-sm text-ink-body">6 to 15 characters.</p>
          <button type="submit" disabled={sending || !token} className={redButton}>
            {sending ? 'Saving…' : 'Save password'}
          </button>
          {!token && <p className="text-sm text-red-600">This page needs the link from your email.</p>}
        </form>
      )}
      <p className="mt-5 text-ink-body">
        <Link href="/forgot-password/" className={textLink}>Ask for a new link</Link>
      </p>
    </>
  );
}
