'use client';

import usePublicSite from '@/hooks/usePublicSite';
import GetAppSection from './GetAppSection';
import QuickEnquiryDialog from './QuickEnquiryDialog';
import SiteFooter from './SiteFooter';
import StickyHeader from './StickyHeader';

/**
 * The frame of the public pages: the sticky header, the "Get the App" band,
 * the footer and the Quick Enquiry pop-up. `headerRevealAfter` hides the
 * header until the page has scrolled that far (the home page's banner).
 */
export default function PublicLayout({ headerRevealAfter = 0, children }) {
  const layout = usePublicSite();
  return (
    <>
      <StickyHeader site={layout.site} links={layout.links} categories={layout.categories} revealAfter={headerRevealAfter} />
      <main className={headerRevealAfter ? '' : 'pt-[60px]'}>{children}</main>
      <GetAppSection />
      <SiteFooter layout={layout} links={layout.links} />
      <QuickEnquiryDialog />
    </>
  );
}
