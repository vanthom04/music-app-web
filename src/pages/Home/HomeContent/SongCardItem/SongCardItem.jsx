import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FaPlay } from 'react-icons/fa6'

import Image from '~/components/Image'
import Button from '~/components/Button'
import styles from './SongCardItem.module.scss'

const cx = classNames.bind(styles)

function SongCardItem({ song, onClick }) {
  return (
    <div className={cx('song-card-item')}>
      <div className={cx('box-image')}>
        <Image
          className={cx('image-item')}
          src={song.imageURL}
          alt={song.name}
        />
      </div>
      <h4 className={cx('name')}>{song.name}</h4>
      <p className={cx('artist')}>{song.artist}</p>
      <Button
        className={cx('play-btn')}
        onClick={() => onClick(song.id)}
      >
        <FaPlay className={cx('icon')} size={20} />
      </Button>
    </div>
  )
}

SongCardItem.propTypes = {
  song: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SongCardItem
