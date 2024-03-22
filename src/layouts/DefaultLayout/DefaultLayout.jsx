import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { LuPen } from 'react-icons/lu'
import { IoMdRemoveCircleOutline } from 'react-icons/io'

import {
  useMenuPlaylist,
  useUpdatePlaylistModal,
  useDeletePlaylistModal
} from '~/hooks'
import Header from '~/layouts/components/Header'
import Sidebar from '~/layouts/components/Sidebar'
import Player from '~/layouts/components/Player'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

const menuPlaylistOptions = [
  {
    id: 'update',
    title: 'Sửa thông tin',
    icon: LuPen
  }, {
    id: 'delete',
    title: 'Xóa',
    icon: IoMdRemoveCircleOutline
  }
]

function DefaultLayout({ children }) {
  const [active, setActive] = useState(false)

  const menuPlaylist = useMenuPlaylist()
  const updatePlaylistModal = useUpdatePlaylistModal()
  const deletePlaylistModal = useDeletePlaylistModal()

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuPlaylist.isOpen && !e.target.closest('#menu-playlist')) {
        menuPlaylist.onClose(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuPlaylist])

  const handleClickItem = (id) => {
    switch (id) {
    case 'update':
      updatePlaylistModal.onOpen()
      menuPlaylist.onClose(false)
      break
    case 'delete':
      deletePlaylistModal.onOpen()
      menuPlaylist.onClose(false)
      break
    default:
      throw new Error('Invalid id: ' + id)
    }
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container', { active })}>
        <Sidebar />
        <div className={cx('view-content')}>
          <Header />
          <main className={cx('content')}>{children}</main>
        </div>
      </div>
      <Player setActive={setActive} active />
      <div
        id="menu-playlist"
        className={cx('menu-playlist')}
        style={{
          display: menuPlaylist.isOpen ? 'block' : 'none',
          top: menuPlaylist.position.y,
          left: menuPlaylist.position.x
        }}
      >
        {menuPlaylistOptions.map((item) => (
          <div
            key={item.id}
            className={cx('item')}
            onClick={() => handleClickItem(item.id)}
          >
            <item.icon className={cx('icon')} size={18} />
            <span className={cx('title')}>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default DefaultLayout
