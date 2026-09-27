import { Container } from '@/components/site/ui';
import { MORE_CITIES } from '@/config/site/home';
import PictureCards from './PictureCards';

/** "Explore More Ads": pictures of other districts. */
export default function MoreCities() {
  return (
    <section className="pb-12">
      <Container>
        <h2 className="mb-6 text-center font-heading text-[26px] font-bold text-ink">Explore More Ads</h2>
        <PictureCards label="Other districts" items={MORE_CITIES} cardClassName="basis-[180px] [&>span]:text-base [&>span]:text-ink-body" />
      </Container>
    </section>
  );
}
