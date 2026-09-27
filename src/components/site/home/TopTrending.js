'use client';

import { useState } from 'react';
import { Container, SectionTitle } from '@/components/site/ui';
import ListingCard from './ListingCard';
import ShareDialog from './ShareDialog';

/** "Top Trendings for your City": the most viewed paid listings. */
export default function TopTrending({ listings, city }) {
  const [sharing, setSharing] = useState(null);
  if (!listings?.length) return null;
  return (
    <section className="pt-5 pb-[70px]">
      <Container>
        <SectionTitle title="Top Trendings for" highlight="your City" text="Discover the top trending places in your city, from popular attractions to hidden gems." className="mb-12" />
        <ul className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:px-[15px]">
          {listings.map((l) => (
            <li key={l.id}>
              <ListingCard listing={l} city={city} onShare={setSharing} />
            </li>
          ))}
        </ul>
      </Container>
      <ShareDialog item={sharing} onClose={() => setSharing(null)} />
    </section>
  );
}
