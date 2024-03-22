import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md'
import { PiRepeatOnceBold } from 'react-icons/pi'
import { FaPlay, FaPause, FaVolumeXmark, FaShuffle, FaVolumeHigh } from 'react-icons/fa6'

import { padStart } from '~/utils/constants'
import { usePlayer } from '~/hooks'
import LikeButton from '~/components/LikeButton'
import Input from '~/components/Input'
import Image from '~/components/Image'
import Button from '~/components/Button'
import styles from './Player.module.scss'

const cx = classNames.bind(styles)

function PlayerContent({ song }) {
  const player = usePlayer()

  const [isPlaying, setIsPlaying] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)
  const [currentTime, setCurrentTime] = useState('-:--')
  const [durationTime, setDurationTime] = useState('-:--')
  const [volume, setVolume] = useState(0.5)
  const [volumeIsMute, setVolumeIsMute] = useState(0)
  const [isMute, setIsMute] = useState(false)

  const audioRef = useRef()
  const progressRef = useRef()

  const onPlayPrevSong = () => {
    if (player.ids.length === 0) return

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const prevSong = player.ids[currentIndex - 1]

    if (!prevSong) return player.setId(player.ids[player.ids.length - 1])
    player.setId(prevSong)
  }

  const onPlayNextSong = () => {
    if (player.ids.length === 0) return

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if (!nextSong) return player.setId(player.ids[0])
    player.setId(nextSong)
  }

  const playSong = () => {
    audioRef.current.play()
    setIsPlaying(true)
  }

  const pauseSong = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }

  useEffect(() => {
    if (!song.songURL) return

    playSong()
  }, [song])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  const handlePlay = () => {
    if (!song.songURL) return
    if (!isPlaying) {
      playSong()
    } else {
      pauseSong()
    }
  }

  const handleEnded = () => {
    onPlayNextSong()
  }

  const handleClickProgress = (e) => {
    const progress = progressRef.current
    const rect = progress.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const newProgress = mouseX / rect.width
    const duration = audioRef.current.duration
    audioRef.current.currentTime = newProgress * duration
  }

  const handleTimeUpdate = (e) => {
    const currentTimeAudio = e.target.currentTime
    const durationTimeAudio = e.target.duration
    setProgressWidth((currentTimeAudio / durationTimeAudio) * 100)

    // // set current time audio
    const currentTimeMin = Math.floor(currentTimeAudio / 60)
    const currentTimeSec = Math.floor(currentTimeAudio % 60)
    setCurrentTime(`${padStart(currentTimeMin, 2)}:${padStart(currentTimeSec, 2)}`)
  }

  const handleLoadedData = () => {
    const durationTimeAudio = audioRef.current.duration
    const durationTimeMin = Math.floor(durationTimeAudio / 60)
    const durationTimeSec = Math.floor(durationTimeAudio % 60)
    setDurationTime(`${padStart(durationTimeMin, 2)}:${padStart(durationTimeSec, 2)}`)
  }

  const handleClickIconVolume = () => {
    if (!isMute) {
      setVolumeIsMute(volume)
      setVolume(0)
      setIsMute(true)
    } else {
      setVolume(volumeIsMute)
      setIsMute(false)
    }
  }

  const handleChangeVolume = (e) => {
    const volume = e.target.value
    setVolume(volume)
  }

  return (
    <>
      <div className={cx('now-playing')}>
        <div className={cx('box-img')}>
          <Image src={song.imageURL} alt={song.name} />
        </div>
        <div className={cx('info')}>
          <div className={cx('title')}>{song.name}</div>
          <div className={cx('artist')}>{song.artist}</div>
          <audio
            ref={audioRef}
            src={song.songURL}
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={handleLoadedData}
          />
        </div>
        <div className={cx('favorite')}>
          <LikeButton song={song} />
        </div>
      </div>
      <div className={cx('controls')}>
        <div className={cx('player')}>
          <Button className={cx('btn', 'btn-random')}>
            <FaShuffle className={cx('icon')} size={18} />
          </Button>
          <Button className={cx('btn', 'btn-prev')} onClick={onPlayPrevSong}>
            <MdSkipPrevious className={cx('icon')} size={28} />
          </Button>
          <Button className={cx('btn', 'btn-play')} onClick={handlePlay}>
            {isPlaying ? (
              <FaPause className={cx('icon')} size={18} />
            ) : (
              <FaPlay className={cx('icon')} size={18} />
            )}
          </Button>
          <Button className={cx('btn', 'btn-next')} onClick={onPlayNextSong}>
            <MdSkipNext className={cx('icon')} size={28} />
          </Button>
          <Button className={cx('btn', 'btn-repeat')}>
            <PiRepeatOnceBold className={cx('icon')} size={22} />
          </Button>
        </div>
        <div className={cx('time-line')}>
          <div className={cx('time')}>{currentTime}</div>
          <div
            ref={progressRef}
            className={cx('progress')}
            onClick={handleClickProgress}
          >
            <div
              style={{ width: `${progressWidth}%` }}
              className={cx('progress-bar')}
            />
          </div>
          <div className={cx('time')}>{durationTime}</div>
        </div>
      </div>
      <div className={cx('volume')}>
        <Button className={cx('btn-volume')} onClick={handleClickIconVolume}>
          {isMute ? <FaVolumeXmark size={24} /> : <FaVolumeHigh size={24} /> }
        </Button>
        <Input
          value={volume}
          type="range"
          className={cx('level')}
          min={0}
          max={1}
          step={0.1}
          onChange={handleChangeVolume}
        />
      </div>
    </>
  )
}

PlayerContent.propTypes = {
  song: PropTypes.object.isRequired
}

export default PlayerContent
