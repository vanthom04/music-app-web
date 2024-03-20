import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import { useUser, usePlayer } from '~/hooks'
import * as songService from '~/services/songService'
import PlayerContent from './PlayerContent'
import styles from './Player.module.scss'

const cx = classNames.bind(styles)

function Player({ active, setActive }) {
  const [song, setSong] = useState()

  const { user } = useUser()
  const player = usePlayer()

  useEffect(() => {
    if (!player.activeId || !user) return

    const fetchData = async () => {
      const result = await songService.getSongById(player.activeId, user.accessToken)
      setSong(result)
      setActive(true)
    }

    fetchData()
  }, [user, player.activeId, setActive])

  if (!song || !player.activeId) return

  return (
    <footer className={cx('wrapper', { active })}>
      <PlayerContent song={song} />
    </footer>
  )
}

export default Player