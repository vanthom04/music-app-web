import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'

import config from '~/config'
import { useRouter } from '~/hooks'
import { useMusic } from '~/context'
import Image from '~/components/Image'
import Loading from '~/components/Loading'
import PlaylistContent from './PlaylistContent'
import styles from './Playlist.module.scss'

const cx = classNames.bind(styles)

function Playlist() {
  const [playlist, setPlaylist] = useState(null)

  const [state] = useMusic()
  const { user, allPlaylist } = state
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (!user) return router.push(config.routes.home)
    const [details] = allPlaylist.filter(p => p.id === params.playlistId)
    setPlaylist(details)
  }, [user, params.playlistId, allPlaylist, router])

  return (
    <>
      {playlist ? (
        <>
          <div className={cx('dashboard')}>
            <Image
              className={cx('image')}
              src={playlist.thumbnail}
              alt={playlist.title}
            />
            <div className={cx('info')}>
              <h5 className={cx('title')}>Playlist</h5>
              <h1 className={cx('display-name')}>{playlist.title}</h1>
              <span className={cx('analytics')}>
                <div className={cx('user')}>
                  <Image
                    className={cx('avatar')}
                    src={user.photoURL}
                    alt={user.fullName}
                  />
                  <h4 className={cx('name')}>{user.fullName}</h4>
                </div>
                <div className={cx('statistical')}>{playlist.analytics}</div>
              </span>
            </div>
          </div>
          <PlaylistContent songs={playlist.songs} />
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Playlist
