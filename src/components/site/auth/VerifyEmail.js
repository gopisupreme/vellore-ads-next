'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '@/components/ui';
import { accountRequested, selectAccountForm } from '@/store/reducers/accountSlice';
import FormNotice from './FormNotice';
import { formTitle, redButton } from './formStyles';

/** Opens the link from the registration email and verifies the account (PHP site: users/verify). */
export default function VerifyEmail() {
  const token = useSearchParams().get('token') ?? '';
  const dispatch = useDispatch();
  const { sending, result, error } = useSelector((state) => selectAccountForm(state, 'verify'));
  // a link works once: send it once, even when React runs effects twice while developing
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current || !token) return;
    sent.current = true;
    dispatch(accountRequested('verify', { token }));
  }, [token, dispatch]);

  return (
    <>
      <h1 className={formTitle}>Email verification</h1>
      {sending && (
        <p className="flex items-center gap-3 text-ink-body">
          <Spinner className="size-5 text-brand-500" /> Checking your link…
        </p>
      )}
      <FormNotice result={result} error={token ? error : 'This page needs the link from your email.'} />
      {(result || error || !token) && (
        <Link href="/login/" className={redButton}>Sign In</Link>
      )}
    </>
  );
}
