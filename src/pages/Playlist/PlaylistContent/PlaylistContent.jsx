import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import { useOnPlay } from '~/hooks'
import HeaderSongItem from '~/components/HeaderSongItem'
import AddSongButton from '~/components/AddSongButton'
import SongNotFound from '~/components/SongNotFound'
import SongItem from '~/components/SongItem'
import styles from './PlaylistContent.module.scss'

const cx = classNames.bind(styles)

function PlaylistContent({ songs }) {
  const onPlay = useOnPlay(songs)

  if (songs.length === 0) return <SongNotFound />

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
        <AddSongButton />
      </div>
    </div>
  )
}

PlaylistContent.propTypes = {
  songs: PropTypes.array.isRequired
}

export default PlaylistContent
