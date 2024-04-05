import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import { useMusic } from '~/context'
import { useOnPlay, useLoginModal } from '~/hooks'
import SongCardItem from './SongCardItem'
import styles from './HomeContent.module.scss'

const cx = classNames.bind(styles)

function HomeContent({ songs }) {
  const [state] = useMusic()
  const { user } = state

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
