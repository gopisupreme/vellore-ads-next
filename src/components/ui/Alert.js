import Icon from './Icon';

const TONES = {
  error: { box: 'bg-red-50 text-red-800 ring-red-200', icon: 'exclamation-circle' },
  success: { box: 'bg-emerald-50 text-emerald-800 ring-emerald-200', icon: 'check-circle' },
  info: { box: 'bg-brand-50 text-brand-800 ring-brand-200', icon: 'info-circle' },
  warning: { box: 'bg-accent-100 text-amber-900 ring-accent-400/50', icon: 'exclamation-triangle' },
};

/** A message box: tone is error, success, info or warning. */
export default function Alert({ tone = 'info', children, className = '' }) {
  const { box, icon } = TONES[tone];
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex gap-3 rounded-lg px-4 py-3 text-sm ring-1 ${box} ${className}`}
    >
      <Icon name={icon} className="mt-0.5" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
