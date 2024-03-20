import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FaPlay } from 'react-icons/fa6'
import { TfiMoreAlt } from 'react-icons/tfi'

import LikeButton from '~/components/LikeButton'
import { padStart } from '~/utils/constants'
import Image from '~/components/Image'
import Button from '~/components/Button'
import styles from './SongItem.module.scss'

const cx = classNames.bind(styles)

function SongItem({ data, active, onClick }) {
  const [duration, setDuration] = useState('')

  useEffect(() => {
    if (!data) return
    const audio = new Audio(data.songURL)
    const handleLoadDuration = () => {
      const durationMin = Math.floor(audio.duration / 60)
      const durationSec = Math.floor(audio.duration % 60)
      setDuration(`${padStart(durationMin, 2)}:${padStart(durationSec, 2)}`)
    }

    audio.addEventListener('loadeddata', handleLoadDuration)
    return () => {
      audio.removeEventListener('loadeddata', handleLoadDuration)
    }
  }, [data])

  return (
    <div className={cx('song-item', { active })}>
      <div className={cx('index')}>
        <span>{data.index + 1}</span>
        <FaPlay
          size={14}
          className={cx('icon-play')}
          onClick={() => onClick(data.id)}
        />
      </div>
      <div className={cx('info')}>
        <Image
          className={cx('thumbnail')}
          src={data.imageURL}
          alt={data.title}
        />
        <div className={cx('column')}>
          <div className={cx('title')}>{data.name}</div>
          <div className={cx('artist')}>{data.artist}</div>
        </div>
      </div>
      <div className={cx('album')}>{data.name}</div>
      <div className={cx('extra-day')}>{data.createdAt}</div>
      <div className={cx('more')}>
        <LikeButton className={cx('liked')} song={data} />
        <span className={cx('duration')}>{duration}</span>
        <Button className={cx('options')}>
          <TfiMoreAlt size={16} />
        </Button>
      </div>
    </div>
  )
}

SongItem.propTypes = {
  data: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func
}

export default SongItem
