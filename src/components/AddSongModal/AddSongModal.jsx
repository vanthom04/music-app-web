import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import { useUser, useDebounce, useAddSongModal, usePlaylist } from '~/hooks'
import * as searchService from '~/services/searchService'
import * as playlistService from '~/services/playlistService'
import Modal from '~/components/Modal'
import styles from './AddSongModal.module.scss'
import SearchInput from '../SearchInput'
import SongItem from './SongItem'
import toast from 'react-hot-toast'

const cx = classNames.bind(styles)

function AddSongModal() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [songs, setSongs] = useState([])

  const debounceValue = useDebounce(value, 500)

  const { user } = useUser()
  const playlist = usePlaylist()
  const addSongModal = useAddSongModal()

  const onChange = (open) => {
    if (!open) {
      addSongModal.onClose()
    }
  }

  useEffect(() => {
    if (addSongModal.isOpen) {
      const fetchApi = async () => {
        setLoading(true)

        const result = await searchService.searchSongs(debounceValue)
        setSongs(result)
        setLoading(false)
      }

      fetchApi()
    }
  }, [user, addSongModal, debounceValue])

  const handleClickAddSong = async (songId) => {
    if (!user) return
    const res = await playlistService.addSongToPlaylist(
      user.id,
      addSongModal.playlistId,
      songId,
      user.accessToken
    )
    if (res.success) {
      toast.success('Thêm bài hát thành công!')
      playlist.onReload()
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
                onClick={(id) => handleClickAddSong(id)}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddSongModal
