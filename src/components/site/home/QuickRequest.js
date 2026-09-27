import { Container, SafeImage } from '@/components/site/ui';
import QuickEnquiryForm from '@/components/site/layout/QuickEnquiryForm';
import { QUICK_REQUEST_STEPS } from '@/config/site/home';

/** "Quick service request" form beside "What service do you need?". */
export default function QuickRequest() {
  return (
    <section id="quickEnquiry" className="bg-[#e9f8fd] py-[30px]">
      <Container className="grid items-start gap-10 md:grid-cols-[408px_1fr] md:gap-[70px] lg:px-[60px]">
        <div className="rounded bg-[#262e3e] p-6 shadow-[0_2px_15px_-5px_rgba(0,0,0,.76)] sm:p-[30px]">
          <h2 className="mb-6 text-center font-heading text-[22px] font-bold text-white">Quick service request</h2>
          <QuickEnquiryForm dark />
        </div>
        <div>
          <h2 className="font-heading text-[28px] leading-tight font-light text-ink md:text-[34px]">
            What service do you need? <span className="block text-[34px] font-bold text-[#333] md:text-[42px]">Business Directory</span>
          </h2>
          <p className="mt-3 text-sm">Tell us more about your requirements so that we can connect you to the right service provider.</p>
          <ul className="mt-2 space-y-3">
            {QUICK_REQUEST_STEPS.map((step) => (
              <li key={step.title} className="flex gap-7">
                <SafeImage src={step.icon} alt="" className="size-[52px] shrink-0 object-contain" />
                <div>
                  <h3 className="font-heading text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6">{step.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
