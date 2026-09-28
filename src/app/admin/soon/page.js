import { Suspense } from 'react';
import PendingPage from '@/components/layout/PendingPage';

export const metadata = { title: 'Being moved' };

// the page reads ?page=&title= in the browser (static export)
export default function PendingAdminPage() {
  return (
    <Suspense>
      <PendingPage />
    </Suspense>
  );
}
