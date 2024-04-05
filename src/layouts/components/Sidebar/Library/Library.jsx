import { useEffect } from 'react'
import classNames from 'classnames/bind'
import { TbPlaylist } from 'react-icons/tb'
import { LuPlus } from 'react-icons/lu'

import config from '~/config'
import { useMusic, actions } from '~/context'
import * as likedService from '~/services/likedService'
import * as playlistService from '~/services/playlistService'
import { useLoginModal, useUploadModal } from '~/hooks'
import LibraryItem from './LibraryItem'
import Button from '~/components/Button'
import styles from './Library.module.scss'

const cx = classNames.bind(styles)

function Library() {
  const [state, dispatch] = useMusic()

  const loginModal = useLoginModal()
  const uploadModal = useUploadModal()

  useEffect(() => {
    if (!state.user) return

    const fetchLiked = async () => {
      const res = await likedService.getLiked(state.user.id, state.user.accessToken)
      dispatch(actions.getLiked(res))
    }

    fetchLiked()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user])

  useEffect(() => {
    if (!state.user) return
    const fetchPlaylist = async () => {
      const res = await playlistService.getAllPlaylist(state.user.id, state.user.accessToken)
      dispatch(actions.getAllPlaylist(res))
    }
    fetchPlaylist()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user])

  const handleClickUpload = () => {
    if (!state.user) {
      return loginModal.onOpen()
    }
    uploadModal.onOpen()
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('title')}>
          <TbPlaylist className={cx('icon')} size={24} />
          <span className={cx('title')}>Thư viện</span>
        </div>
        <Button className={cx('btn-add')} onClick={handleClickUpload}>
          <LuPlus className={cx('icon')} size={24} />
        </Button>
      </div>
      <nav className={cx('libraries')}>
        {state.user && state.liked.songs ? (
          <>
            <LibraryItem
              to={config.routes.liked}
              thumbnail="/assets/images/liked.png"
              title="Bài hát đã thích"
              analytics={`${state.liked.songs.length} Bài hát`}
            />
            {state.allPlaylist.map((item) => (
              <LibraryItem
                key={item.id}
                to={`/playlist/${item.id}`}
                thumbnail={item.thumbnail}
                title={item.title}
                analytics={item.analytics}
              />
            ))}
          </>
        ) : (
          <Button
            className={cx('btn-login')}
            onClick={() => loginModal.onOpen()}
          >
            Đăng nhập
          </Button>
        )}
      </nav>
    </div>
  )
}

export default Library
