/** A Font Awesome 4 icon (src/assets/font-awesome), e.g. <Icon name="tachometer" />. Names: fontawesome.com/v4/icons */
export default function Icon({ name, className = '' }) {
  return <i className={`fa fa-${name} ${className}`} aria-hidden="true" />;
}
