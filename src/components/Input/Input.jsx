import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import classNames from 'classnames/bind'
import styles from './Input.module.scss'

const cx = classNames.bind(styles)

const Input = forwardRef(({ type = 'text', className, disabled, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cx('wrapper', className)}
      disabled={disabled}
      spellCheck="false"
      {...props}
    />
  )
})

Input.displayName = 'Input'
Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool
}

export default Input
