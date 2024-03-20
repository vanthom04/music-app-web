import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
  to,
  href,
  children,
  className,
  disabled = false,
  onClick,
  ...passProps
}) {
  let Component = 'button'
  const props = {
    onClick,
    ...passProps
  }

  if (to) {
    Component = Link
    props.to = to
  } else if (href) {
    Component = 'a'
    props.href = href
  }

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof key === 'function') {
        delete props[key]
      }
    })
  }

  const classes = cx('wrapper', {
    [className]: className,
    disabled
  })

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
