/** The PHP site's page width (Bootstrap's 1170px container). */
export default function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1170px] px-[15px] ${className}`}>{children}</div>;
}
