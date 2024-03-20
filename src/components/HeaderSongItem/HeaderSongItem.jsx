import classNames from 'classnames/bind'
import { LuClock3 } from 'react-icons/lu'
import styles from './HeaderSongItem.module.scss'

const cx = classNames.bind(styles)

function HeaderSongItem() {
  return (
    <div className={cx('wrapper')}>
      <span>#</span>
      <span>Tiêu đề</span>
      <span>Album</span>
      <span>Ngày thêm</span>
      <span>
        <LuClock3 size={16} />
      </span>
    </div>
  )
}

export default HeaderSongItem
