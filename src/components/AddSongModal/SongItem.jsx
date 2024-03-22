import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import Image from '~/components/Image'
import Button from '~/components/Button'
import styles from './AddSongModal.module.scss'

const cx = classNames.bind(styles)

function SongItem({ song, onClick }) {
  return (
    <div className={cx('song-item')}>
      <div className={cx('info')}>
        <Image
          className={cx('thumbnail')}
          src={song.imageURL}
          alt={song.name}
        />
        <div className={cx('column')}>
          <div className={cx('name')}>{song.name}</div>
          <div className={cx('artist')}>{song.artist}</div>
        </div>
      </div>
      <Button
        className={cx('btn-add')}
        onClick={() => onClick(song.id)}
      >
        Thêm
      </Button>
    </div>
  )
}

SongItem.propTypes = {
  song: PropTypes.object.isRequired,
  onClick: PropTypes.func
}
export default SongItem
