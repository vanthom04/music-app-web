import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import classNames from 'classnames/bind'

import { useMusic, actions } from '~/context'
import * as playlistService from '~/services/playlistService'
import { useMenuPlaylist, useUpdatePlaylistModal } from '~/hooks'
import Modal from '~/components/Modal'
import Input from '~/components/Input'
import Button from '~/components/Button'
import styles from './UpdatePlaylistModal.module.scss'

const cx = classNames.bind(styles)

function UpdatePlaylistModal() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const [state, dispatch] = useMusic()
  const menuPlaylist = useMenuPlaylist()
  const updatePlaylistModal = useUpdatePlaylistModal()

  useEffect(() => {
    setTitle(menuPlaylist.info.title)
  }, [menuPlaylist])

  const onChange = (open) => {
    if (!open) {
      updatePlaylistModal.onClose()
      setTitle('')
      setFile(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!state.user) return
    if (!title || !file) {
      return toast.error('Vui lòng nhập đầy đủ thông tin!')
    }

    setLoading(true)
    const formData = new FormData(e.target)
    const res = await playlistService
      .updatePlaylist(state.user.id, menuPlaylist.info.id, formData, state.user.accessToken)

    if (res.success) {
      toast.success('Sửa thông tin thành công!')
      updatePlaylistModal.onClose()
      setTitle('')
      setFile(null)

      const thumbnail = URL.createObjectURL(file)
      dispatch(actions.updatePlaylist({ id: menuPlaylist.info.id, title, thumbnail }))
    } else {
      toast.error('Sửa thông tin thất bại!')
    }
    setLoading(false)
  }

  return (
    <Modal
      title="Sửa thông tin chi tiết"
      isOpen={updatePlaylistModal.isOpen}
      onChange={onChange}
    >
      <form
        className={cx('form-upload')}
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          value={title}
          name="title"
          className={cx('input')}
          disabled={loading}
          placeholder="Nhập tên danh sách phát"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <div className={cx('title-file-image')}>
            Chọn hình ảnh (1:1)
          </div>
          <Input
            type="file"
            name="imageFile"
            accept="image/*"
            disabled={loading}
            className={cx('input-file')}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <Button
          className={cx('btn-submit')}
          disabled={loading}
          type="submit"
        >
          Lưu
        </Button>
      </form>

    </Modal>
  )
}

export default UpdatePlaylistModal
