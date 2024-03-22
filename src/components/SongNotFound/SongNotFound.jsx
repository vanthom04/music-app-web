import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import AddSongButton from '~/components/AddSongButton'
import styles from './SongNotFound.module.scss'

const cx = classNames.bind(styles)

function SongNotFound({ playlistId }) {

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>Hiện chưa có bài hát nào trong danh sách phát</div>
      <AddSongButton playlistId={playlistId} />
    </div>
  )
}

SongNotFound.popTypes = {
  playlistId: PropTypes.string
}

export default SongNotFound
