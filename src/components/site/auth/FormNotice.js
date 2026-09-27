import { Alert } from '@/components/ui';

/**
 * A form's outcome: the error, or the success message (plus, while
 * developing without email, the link the email would have carried).
 */
export default function FormNotice({ error, result, className = 'mb-5' }) {
  if (error) {
    return <Alert tone="error" className={`text-left ${className}`}>{error}</Alert>;
  }
  if (!result?.message) return null;
  return (
    <Alert tone="success" className={`text-left ${className}`}>
      {result.message}
      {result.devLink && (
        <p className="mt-2 text-xs">
          Development only (no email sent):{' '}
          <a href={result.devLink} className="font-medium break-all underline">
            {result.devLink}
          </a>
        </p>
      )}
    </Alert>
  );
}
