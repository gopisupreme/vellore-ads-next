import { Container, SectionTitle } from '@/components/site/ui';
import PictureCards from './PictureCards';

/** "Top Attractions in <city>" (top_attractions table). */
export default function Attractions({ city, attractions }) {
  if (!attractions?.length) return null;
  return (
    <section className="py-[70px]">
      <Container>
        <SectionTitle title="Top Attractions in" highlight={city} text="Explore the top tourist attractions in your city, featuring must-see landmarks, activities, and hidden gems." />
        <PictureCards label="Top attractions" items={attractions.map((a) => ({ key: a.id, name: a.name, image: a.image, url: a.url }))} />
      </Container>
    </section>
  );
}
