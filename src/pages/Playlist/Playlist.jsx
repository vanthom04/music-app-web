import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'

import { useUser } from '~/hooks'
import * as playlistService from '~/services/playlistService'
import Image from '~/components/Image'
import PlaylistContent from './PlaylistContent'
import styles from './Playlist.module.scss'
import Loading from '~/components/Loading'

const cx = classNames.bind(styles)

function Playlist() {
  const [playlist, setPlaylist] = useState(null)
  const [songs, setSongs] = useState([])

  const { user } = useUser()
  const params = useParams()

  useEffect(() => {
    if (!user) return

    const fetchPlaylist = async () => {
      const userId = user.id
      const accessToken = user.accessToken
      const playlistId = params.playlistId
      const res = await playlistService.getPlaylist(userId, playlistId, accessToken)
      setPlaylist(res)
      setSongs(res.songs)
    }

    fetchPlaylist()
  }, [user, params.playlistId])

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
                    src="https://i.imgur.com/l8Zh2zx.png"
                    alt=""
                  />
                  <h4 className={cx('name')}>Văn Thơm</h4>
                </div>
                <div className={cx('statistical')}>{playlist.analytics}</div>
              </span>
            </div>
          </div>
          <PlaylistContent playlistId={params.playlistId} songs={songs} />
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Playlist
