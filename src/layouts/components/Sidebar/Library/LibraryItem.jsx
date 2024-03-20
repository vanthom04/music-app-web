import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames/bind'
import Image from '~/components/Image'
import styles from './Library.module.scss'

const cx = classNames.bind(styles)

function LibraryItem({ to, title, thumbnail, analytics }) {
  return (
    <NavLink
      to={to}
      className={(nav) => cx('library-item', { active: nav.isActive })}
    >
      <Image className={cx('image')} src={thumbnail} alt={title} />
      <div className={cx('item-info')}>
        <h4 className={cx('title')}>{title}</h4>
        <p className={cx('analytics')}>{analytics}</p>
      </div>
    </NavLink>
  )
}

LibraryItem.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  analytics: PropTypes.string.isRequired
}

export default LibraryItem
