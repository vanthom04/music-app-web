import classNames from 'classnames/bind'
import { LuPlus } from 'react-icons/lu'

import Button from '~/components/Button'
import styles from './SongNotFound.module.scss'

const cx = classNames.bind(styles)

function SongNotFound() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>Hiện chưa có bài hát nào trong danh sách phát</div>
      <Button className={cx('btn-add')}>
        <LuPlus className={cx('icon')} size={22} />
      </Button>
    </div>
  )
}

export default SongNotFound
