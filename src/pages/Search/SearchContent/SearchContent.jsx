import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import { useUser, useOnPlay, useLoginModal } from '~/hooks'
import LikeButton from '~/components/LikeButton'
import Image from '~/components/Image'
import styles from './SearchContent.module.scss'

const cx = classNames.bind(styles)

function SearchContent({ songs }) {
  const { user } = useUser()
  const onPlay = useOnPlay(songs)
  const loginModal = useLoginModal()

  if (songs.length === 0) {
    return <div className={cx('no-song-found')}>Không tìm thấy bài hát</div>
  }

  const handleClick = (id) => {
    if (!user) return loginModal.onOpen()
    onPlay(id)
  }

  return (
    <div className={cx('wrapper')}>
      {songs.map(song => (
        <div key={song.id} className={cx('song-item')}>
          <div className={cx('info')} onClick={() => handleClick(song.id)}>
            <Image
              className={cx('thumbnail')}
              src={song.imageURL}
              alt={song.name}
            />
            <div className={cx('info-item')}>
              <div className={cx('name')}>{song.name}</div>
              <div className={cx('artist')}>{song.artist}</div>
            </div>
          </div>
          <LikeButton className={cx('like-btn')} song={song} />
        </div>
      ))}
    </div>
  )
}

SearchContent.propTypes = {
  songs: PropTypes.array
}

export default SearchContent
