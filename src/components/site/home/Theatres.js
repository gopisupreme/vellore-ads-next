import { Container, SectionTitle } from '@/components/site/ui';
import IconRow from './IconRow';

/** "Theatre's in <city>": the cinemas table. */
export default function Theatres({ city, cinemas }) {
  if (!cinemas?.length) return null;
  return (
    <section className="pt-[100px]">
      <Container>
        <SectionTitle title="Theatre's in" highlight={city} text="Stay updated with latest movie releases." className="mb-9" />
        <IconRow
          label="Theatres"
          items={cinemas.map((c) => ({ key: c.id, label: c.title, url: c.url, image: c.image }))}
          imageClassName="h-[100px] rounded-[5px]"
          captionClassName="text-[15px] leading-snug"
        />
      </Container>
    </section>
  );
}
