import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'

import { useMusic, actions } from '~/context'
import { useDebounce, useAddSongModal } from '~/hooks'
import * as songService from '~/services/songService'
import * as searchService from '~/services/searchService'
import * as playlistService from '~/services/playlistService'
import Modal from '~/components/Modal'
import SearchInput from '~/components/SearchInput'
import SongItem from './SongItem'
import styles from './AddSongModal.module.scss'

const cx = classNames.bind(styles)

function AddSongModal() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [songs, setSongs] = useState([])

  const debounceValue = useDebounce(value, 500)

  const [state, dispatch] = useMusic()
  const { user, allSongs } = state
  const addSongModal = useAddSongModal()

  const onChange = (open) => {
    if (!open) {
      addSongModal.onClose()
    }
  }

  useEffect(() => {
    if (addSongModal.isOpen) {
      if (!value) {
        if (allSongs.length === 0) {
          const fetchApi = async () => {
            const result = await songService.getAllSongs()
            dispatch(actions.getAllSongs(result))
          }

          fetchApi()
        } else {
          setSongs(allSongs)
        }
        return
      }

      const fetchApi = async () => {
        setLoading(true)
        const result = await searchService.searchSongs(debounceValue)
        setSongs(result)
        setLoading(false)
      }

      fetchApi()
    }
  }, [user, addSongModal, debounceValue, value, allSongs, dispatch])

  const handleClickAddSong = async (song) => {
    if (!user) return

    const res = await playlistService.addSongToPlaylist(
      user.id,
      addSongModal.playlistId,
      song.id,
      user.accessToken
    )
    if (res.success) {
      dispatch(actions.addSongToPlaylist({ song, playlistId: addSongModal.playlistId }))
      toast.success('Thêm bài hát thành công!')
    } else {
      toast.error('Thêm bài hát không thành công!')
    }
  }

  return (
    <Modal
      title="Thêm bài hát vào danh sách phát"
      isOpen={addSongModal.isOpen}
      onChange={onChange}
    >
      <div className={cx('wrapper')}>
        <header>
          <SearchInput
            value={value}
            loading={loading}
            onChange={(e) => setValue(e.target.value)}
            handleClear={() => setValue('')}
          />
        </header>
        <div className={cx('container')}>
          <h3 className={cx('heading')}>Tất cả bài hát</h3>
          <div>
            {songs.map((song) => (
              <SongItem
                key={song.id}
                song={song}
                onClick={(data) => handleClickAddSong(data)}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddSongModal
