/** The faces background of the account pages, darkened (PHP site: tz-register). */
export default function AuthBackground({ children }) {
  return (
    <section className="relative isolate bg-[#e6e6e6] bg-[url(/assets/images/face.jpg)] px-4 py-10 sm:py-[62px]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgba(33,48,59,.52)]" />
      {children}
    </section>
  );
}
