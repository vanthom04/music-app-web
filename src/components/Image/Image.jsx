import PropTypes from 'prop-types'
import { forwardRef, useState } from 'react'
import classNames from 'classnames'
import images from '~/assets/images'
import styles from './Image.module.scss'

const Image = forwardRef(({ src, alt, className, ...props }, ref) => {
  const customFallback = images.noImage
  const [fallback, setFallback] = useState('')

  const handleError = () => {
    setFallback(customFallback)
  }

  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={fallback || src}
      alt={alt}
      {...props}
      onError={handleError}
    />
  )
})

Image.displayName = 'Image'
Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string
}

export default Image
