'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import useSession from '@/hooks/useSession';
import { homeFor } from '@/config/roles';
import { loginErrorCleared, loginRequested } from '@/store/reducers/authSlice';
import { selectAccountForm } from '@/store/reducers/accountSlice';
import { AuthField, PasswordField } from './AuthField';
import FormNotice from './FormNotice';
import { formTitle, redButton, textLink } from './formStyles';

/**
 * Sign in (PHP site: users/login). Admins go to their dashboard here; other
 * accounts go to the home page, signed in.
 */
export default function SignInForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loggingIn, error } = useSession();
  // "you are registered" shows here after the register page, as the PHP site's flash message
  const registered = useSelector((state) => selectAccountForm(state, 'register'));
  const destination = user ? homeFor(user.role) ?? '/' : null;

  useEffect(() => {
    if (destination) router.replace(destination);
  }, [destination, router]);

  // leaving the page clears a failed sign-in's message
  useEffect(() => () => dispatch(loginErrorCleared()), [dispatch]);

  function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    dispatch(loginRequested({ email: form.get('email'), password: form.get('password') }));
  }

  return (
    <>
      <h1 className={formTitle}>Sign In</h1>
      <p className="mb-8 text-xs text-ink-body">
        Don&apos;t have an account?{' '}
        <Link href="/register/" className={`text-base ${textLink}`}>Create a new account</Link>
      </p>
      <FormNotice result={registered.result} error={error} />
      <form onSubmit={submit} className="space-y-2.5">
        <AuthField label="Email Address" name="email" type="email" autoComplete="username" required autoFocus />
        <PasswordField name="password" autoComplete="current-password" required />
        <p className="text-right">
          <Link href="/forgot-password/" className={textLink}>Forgot password</Link>
        </p>
        <div className="pt-4">
          <button type="submit" disabled={loggingIn || Boolean(destination)} className={redButton}>
            {loggingIn ? 'Signing in…' : 'Log In'}
          </button>
        </div>
      </form>
    </>
  );
}
