import classNames from 'classnames/bind'

import HeaderSongItem from '~/components/HeaderSongItem'
import SongNotFound from '~/components/SongNotFound'
import SongItem from '~/components/SongItem'
import styles from './PlaylistContent.module.scss'
import { useOnPlay } from '~/hooks'

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
          data={{ ...song, index }}
          onClick={(id) => onPlay(id)}
        />
      ))}
    </div>
  )
}

export default PlaylistContent
