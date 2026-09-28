'use client';

import { useSearchParams } from 'next/navigation';
import useSite from '@/hooks/useSite';
import { Breadcrumbs, Card, Icon } from '@/components/ui';
import { ADMIN_HOME } from '@/config/adminMenu';

// only PHP site paths such as "connect/all_users" are linked
const SAFE_PATH = /^[a-z0-9_/-]+$/i;

/**
 * A dashboard page that is still on the PHP site (?page=&title=): says so and
 * links to it. `homeHref` is the dashboard the breadcrumb goes back to.
 */
export default function PendingPage({ homeHref = ADMIN_HOME }) {
  const params = useSearchParams();
  const site = useSite();
  const title = params.get('title') || 'Page';
  const page = params.get('page') || '';
  const phpUrl = site && SAFE_PATH.test(page) ? `${site.siteUrl}${page}` : null;

  return (
    <>
      <Breadcrumbs homeHref={homeHref} current={title} />
      <Card title={title} bodyClassName="flex flex-col items-center px-6 py-14 text-center">
        <Icon name="wrench" className="text-4xl text-link" />
        <p className="mt-4 font-heading text-xl font-bold text-ink">This page is being moved to the new dashboard</p>
        <p className="mt-2 max-w-md text-sm">Until then it works on the PHP site, where you may need to sign in again.</p>
        {phpUrl && (
          <a
            href={phpUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded bg-link px-4 py-2 text-sm font-semibold text-white hover:brightness-95"
          >
            Open on the PHP site <Icon name="external-link" />
          </a>
        )}
      </Card>
    </>
  );
}
