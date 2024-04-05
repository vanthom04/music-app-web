import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import { useMusic } from '~/context'
import { usePlayer } from '~/hooks'
import * as songService from '~/services/songService'
import PlayerContent from './PlayerContent'
import styles from './Player.module.scss'

const cx = classNames.bind(styles)

function Player({ active, setActive }) {
  const [song, setSong] = useState()

  const [state] = useMusic()
  const { user } = state
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

Player.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func
}

export default Player