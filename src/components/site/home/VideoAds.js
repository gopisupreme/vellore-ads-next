import { Carousel, Container, SectionTitle, YouTubeVideo } from '@/components/site/ui';

/** "Reach the Right Customers": video ads from youtube_videos. */
export default function VideoAds({ videos }) {
  if (!videos?.length) return null;
  return (
    <section className="bg-linear-to-b from-white to-[#e3e6ef] py-[70px]">
      <Container>
        <SectionTitle title="Reach The Right Customers" text="" className="mb-2" />
        <p className="mb-6 text-center text-base text-[#3d5469]">Make A Video Ad. Types: Bumper ads, Outstream Video ads.</p>
        <Carousel label="Video ads" trackClassName="gap-[30px]">
          {videos.map((v) => (
            <div key={v.id} className="shrink-0 basis-full snap-start sm:basis-[calc(50%-15px)] lg:basis-[calc(33.333%-20px)]">
              <YouTubeVideo id={v.youtubeId} title={v.name || 'Video ad'} />
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
