import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import HeaderSongItem from '~/components/HeaderSongItem'
import AddSongButton from '~/components/AddSongButton'
import SongNotFound from '~/components/SongNotFound'
import SongItem from '~/components/SongItem'
import styles from './PlaylistContent.module.scss'
import { useOnPlay } from '~/hooks'

const cx = classNames.bind(styles)

function PlaylistContent({ playlistId, songs }) {
  const onPlay = useOnPlay(songs)

  if (songs.length === 0) return <SongNotFound playlistId={playlistId} />

  return (
    <div className={cx('wrapper')}>
      <HeaderSongItem />
      {songs.map((song, index) => (
        <SongItem
          key={index}
          song={{ ...song, index }}
          onClick={(id) => onPlay(id)}
        />
      ))}
      <div className={cx('footer')}>
        <h3>Thêm bài hát</h3>
        <AddSongButton playlistId={playlistId} />
      </div>
    </div>
  )
}

PlaylistContent.propTypes = {
  playlistId: PropTypes.string,
  songs: PropTypes.array.isRequired
}

export default PlaylistContent
