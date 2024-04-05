import { useEffect } from 'react'
import classNames from 'classnames/bind'

import config from '~/config'
import { useRouter } from '~/hooks'
import { useMusic } from '~/context'
import Image from '~/components/Image'
import Loading from '~/components/Loading'
import LikedContent from './LikedContent'
import styles from './Liked.module.scss'

const cx = classNames.bind(styles)

function Liked() {
  const router = useRouter()
  const [state] = useMusic()
  const { user, liked } = state

  useEffect(() => {
    if (!user) return router.push(config.routes.home)
  }, [router, user])

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
                    src={user.photoURL}
                    alt={user.fullName}
                  />
                  <h4 className={cx('name')}>{user.fullName}</h4>
                </div>
                <div className={cx('statistical')}>
                  {`${liked.songs.length} Bài hát`}
                </div>
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
