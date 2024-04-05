import classNames from 'classnames/bind'
import AddSongButton from '~/components/AddSongButton'
import styles from './SongNotFound.module.scss'

const cx = classNames.bind(styles)

function SongNotFound() {

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>Hiện chưa có bài hát nào trong danh sách phát</div>
      <AddSongButton />
    </div>
  )
}

export default SongNotFound
