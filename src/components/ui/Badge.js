const TONES = {
  info: 'bg-label-info',
  success: 'bg-label-success',
  danger: 'bg-label-danger',
  warning: 'bg-label-warning',
  primary: 'bg-label-primary',
};

/**
 * A small coloured label (the PHP pages' Bootstrap "label"). With `onClick`
 * it is a button, e.g. the Active / Verified switches of a listing.
 */
export default function Badge({ tone = 'info', onClick, disabled, title, children }) {
  const className = `inline-block rounded-[3px] px-1.5 py-0.5 text-[11px] leading-tight font-semibold whitespace-nowrap text-white ${TONES[tone]}`;
  if (!onClick) {
    return (
      <span className={className} title={title}>
        {children}
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${className} cursor-pointer hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-label-primary disabled:cursor-wait disabled:opacity-60`}
    >
      {children}
    </button>
  );
}
