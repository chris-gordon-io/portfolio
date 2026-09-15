import { Link } from 'react-router-dom'

/**
 * Button — wraps the design system's .btn classes (see
 * github.com/chris-gordon-io/Design-System, css/buttons.css).
 *
 * @param {'primary'|'primary-reversed'|'secondary'} variant
 * @param {'sm'|'md'|'lg'}                            size
 * @param {ReactNode}                                 icon    Optional `<svg className="btn-icon">…</svg>`, rendered before children.
 * @param {string}                                     to      Renders a react-router <Link> when set.
 * @param {string}                                     href    Renders a plain <a> when set (and `to` isn't).
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  to,
  href,
  children,
  className = '',
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size}${className ? ` ${className}` : ''}`
  const content = (
    <>
      {icon}
      {children}
    </>
  )

  if (to) {
    return <Link to={to} className={classes} {...rest}>{content}</Link>
  }
  if (href) {
    return <a href={href} className={classes} {...rest}>{content}</a>
  }
  return <button type="button" className={classes} {...rest}>{content}</button>
}
