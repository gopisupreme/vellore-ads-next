import { Container } from '@/components/site/ui';
import { APP_LINKS } from '@/config/site/home';
import IconRow from './IconRow';

/** Prime Video, Netflix, ... : shortcuts to popular apps. */
export default function AppLinks() {
  return (
    <section className="pt-[60px]">
      <Container>
        <IconRow label="Popular apps" items={APP_LINKS} />
      </Container>
    </section>
  );
}
