import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import SongCardItem from './SongCardItem'
import styles from './HomeContent.module.scss'
import { useOnPlay, useUser, useLoginModal } from '~/hooks'

const cx = classNames.bind(styles)

function HomeContent({ songs }) {
  const { user } = useUser()
  const onPlay = useOnPlay(songs)
  const loginModal = useLoginModal()

  const handleClick = (id) => {
    if (!user) return loginModal.onOpen()
    onPlay(id)
  }

  return (
    <div className={cx('wrapper')}>
      {songs.map((song) => (
        <SongCardItem
          key={song.id}
          song={song}
          onClick={handleClick}
        />
      ))}
    </div>
  )
}

HomeContent.propTypes = {
  songs: PropTypes.array.isRequired
}

export default HomeContent
