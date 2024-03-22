import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames/bind'

import { useMenuPlaylist } from '~/hooks'
import Image from '~/components/Image'
import styles from './Library.module.scss'

const cx = classNames.bind(styles)

function LibraryItem({ to, title, thumbnail, analytics }) {
  const menuPlaylist = useMenuPlaylist()

  const handleClickMore = (e) => {
    e.preventDefault()
    if (to === '/liked') return
    menuPlaylist.onOpen()
    menuPlaylist.setPosition(e.clientX, e.clientY)
    menuPlaylist.setInfo(to.split('/')[to.split('/').length - 1], title, thumbnail)
  }

  return (
    <NavLink
      to={to}
      className={(active) => cx('library-item', { active: active.isActive })}
      onContextMenu={handleClickMore}
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
