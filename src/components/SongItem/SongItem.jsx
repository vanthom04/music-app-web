import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FaPlay } from 'react-icons/fa6'
import { TfiMoreAlt } from 'react-icons/tfi'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { CgSoftwareDownload } from 'react-icons/cg'

import { useUser, usePlaylist } from '~/hooks'
import * as playlistService from '~/services/playlistService'
import LikeButton from '~/components/LikeButton'
import { padStart } from '~/utils/constants'
import Image from '~/components/Image'
import Button from '~/components/Button'
import styles from './SongItem.module.scss'

const cx = classNames.bind(styles)

const menuOptions = [
  {
    id: 'remove',
    title: 'Xóa khỏi danh sách phát',
    icon: IoMdRemoveCircleOutline
  },
  {
    id: 'download',
    title: 'Tải xuống bài hát',
    icon: CgSoftwareDownload
  }
]

function SongItem({ song, onClick }) {
  const [duration, setDuration] = useState('')
  const [menu, setMenu] = useState([])
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const { user } = useUser()
  const location = useLocation()
  const playlist = usePlaylist()

  useEffect(() => {
    const pathname = location.pathname
    if (pathname === '/liked') {
      setMenu(menuOptions.filter((item) => item.id !== 'remove'))
    } else {
      setMenu(menuOptions)
    }
  }, [location])

  useEffect(() => {
    if (!song) return
    const audio = new Audio(song.songURL)
    const handleLoadDuration = () => {
      const durationMin = Math.floor(audio.duration / 60)
      const durationSec = Math.floor(audio.duration % 60)
      setDuration(`${padStart(durationMin, 2)}:${padStart(durationSec, 2)}`)
    }

    audio.addEventListener('loadeddata', handleLoadDuration)
    return () => audio.removeEventListener('loadeddata', handleLoadDuration)
  }, [song])

  const handleOptionsClick = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  const removeSongFormPlaylist = async () => {
    if (!user) return
    const playlistId = location.pathname.split('/')[location.pathname.split('/').length - 1]
    const res = await playlistService
      .removeSongFormPlaylist(user.id, playlistId, song.id, user.accessToken)

    if (res.success) {
      toast.success('Xóa khỏi danh sách phát thành công')
      playlist.onReload()
    } else {
      toast.error('Xóa bài hát khỏi danh sách phát không thành công')
    }
  }

  const downloadFile = () => {
    fetch(song.songURL)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(new Blob([blob]))
        link.setAttribute('download', `${song.name} - ${song.artist}.mp3`)
        link.click()
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const handleClickItemMenu = (id) => {
    switch (id) {
    case 'remove':
      removeSongFormPlaylist()
      break
    case 'download':
      downloadFile()
      break
    default:
      throw new Error('Invalid id: ' + id)
    }
  }

  return (
    <div className={cx('song-item', {
      active: false,
      openmenu: isOpenMenu
    })}>
      <div className={cx('index')}>
        <span>{song.index + 1}</span>
        <FaPlay
          size={14}
          className={cx('icon-play')}
          onClick={() => onClick(song.id)}
        />
      </div>
      <div className={cx('info')}>
        <Image
          className={cx('thumbnail')}
          src={song.imageURL}
          alt={song.title}
        />
        <div className={cx('column')}>
          <div className={cx('title')}>{song.name}</div>
          <div className={cx('artist')}>{song.artist}</div>
        </div>
      </div>
      <div className={cx('album')}>{song.name}</div>
      <div className={cx('extra-day')}>{song.createdAt}</div>
      <div className={cx('more')}>
        <LikeButton className={cx('liked')} song={song} />
        <span className={cx('duration')}>{duration}</span>
        <Button className={cx('options')} onClick={handleOptionsClick}
          onMouseLeave={() => setIsOpenMenu(false)}>
          <TfiMoreAlt size={16} />
          {isOpenMenu && (
            <div className={cx('menu-list-options')}>
              {menu.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleClickItemMenu(item.id)}
                  className={cx('menu-item-options')}
                >
                  <item.icon className={cx('icon')} size={22} />
                  <span className={cx('title')}>{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}

SongItem.propTypes = {
  song: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func
}

export default SongItem
