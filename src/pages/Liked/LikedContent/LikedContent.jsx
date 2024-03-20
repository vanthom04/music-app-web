import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import { useOnPlay } from '~/hooks'
import HeaderSongItem from '~/components/HeaderSongItem'
import SongNotFound from '~/components/SongNotFound'
import SongItem from '~/components/SongItem'
import styles from './LikedContent.module.scss'

const cx = classNames.bind(styles)

function LikedContent({ songs }) {
  const onPlay = useOnPlay(songs)

  if (songs.length === 0) return <SongNotFound />

  return (
    <div className={cx('wrapper')}>
      <HeaderSongItem />
      {songs.map((song, index) => (
        <SongItem
          key={song.id}
          data={{ ...song, index }}
          onClick={(id) => onPlay(id)}
        />
      ))}
    </div>
  )
}

LikedContent.propTypes = {
  songs: PropTypes.array.isRequired
}

export default LikedContent
