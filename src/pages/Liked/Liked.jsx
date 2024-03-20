import classNames from 'classnames/bind'

import { useLiked, useUser } from '~/hooks'
import Image from '~/components/Image'
import Loading from '~/components/Loading'
import LikedContent from './LikedContent'
import styles from './Liked.module.scss'

const cx = classNames.bind(styles)

function Liked() {
  const liked = useLiked()
  const { user } = useUser()

  return (
    <>
      {user && liked ? (
        <>
          <div className={cx('dashboard')}>
            <Image
              className={cx('image')}
              src="/assets/images/liked.png"
              alt="Liked"
            />
            <div className={cx('info')}>
              <h5 className={cx('title')}>Playlist</h5>
              <h1 className={cx('display-name')}>Bài hát đã thích</h1>
              <span className={cx('analytics')}>
                <div className={cx('user')}>
                  <Image
                    className={cx('avatar')}
                    src="https://i.imgur.com/l8Zh2zx.png"
                    alt=""
                  />
                  <h4 className={cx('name')}>Văn Thơm</h4>
                </div>
                <div className={cx('statistical')}>{`${liked.songs.length} Bài hát`}</div>
              </span>
            </div>
          </div>
          <LikedContent songs={liked.songs} />
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Liked
