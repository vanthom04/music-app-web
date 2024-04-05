import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { FaPlay } from 'react-icons/fa6'

import config from '~/config'
import { useMusic, actions } from '~/context'
import { useRouter, useLoginModal } from '~/hooks'
import * as songService from '~/services/songService'
import Image from '~/components/Image'
import HomeContent from './HomeContent'
import Button from '~/components/Button'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
  const [title, setTitle] = useState('Xin chào!')

  const [state, dispatch] = useMusic()
  const { user, allSongs } = state
  const router = useRouter()
  const loginModal = useLoginModal()

  useEffect(() => {
    const now = new Date()
    const hours = now.getHours()
    if (hours >= 1 && hours <= 11) {
      setTitle('Chào buổi sáng')
    } else if (hours >= 12 && hours <= 17) {
      setTitle('Chào buổi chiều')
    } else if ((hours >= 18 && hours <= 23) || hours === 0) {
      setTitle('Chào buổi tối')
    }
  }, [])

  useEffect(() => {
    if (allSongs.length === 0) {
      const fetchApi = async () => {
        const result = await songService.getAllSongs()
        dispatch(actions.getAllSongs(result))
      }

      fetchApi()
    }
  }, [allSongs.length, dispatch])

  const handleClickLiked = () => {
    if (!user) {
      return loginModal.onOpen()
    }
    router.push(config.routes.liked)
  }

  return (
    <>
      <div className={cx('header')}>
        <h1 className={cx('title')}>{title}</h1>
        <div className={cx('liked')} onClick={handleClickLiked}>
          <Image
            className={cx('image')}
            src="/assets/images/liked.png"
            alt="Favorites"
          />
          <span className={cx('title')}>Bài hát đã thích</span>
          <Button className={cx('play-btn')}>
            <FaPlay className={cx('icon')} size={20} />
          </Button>
        </div>
      </div>
      <div className={cx('content')}>
        <div className={cx('content-title')}>
          <h2 className={cx('title')}>Tất cả bài hát</h2>
        </div>
        <HomeContent songs={allSongs} />
      </div>
    </>
  )
}

export default Home
