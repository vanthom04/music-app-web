import { useState } from 'react'
import toast from 'react-hot-toast'
import classNames from 'classnames/bind'

import { useMusic, actions } from '~/context'
import * as playlistService from '~/services/playlistService'
import { useUploadModal } from '~/hooks'
import Modal from '~/components/Modal'
import Input from '~/components/Input'
import Button from '~/components/Button'
import styles from './UploadPlaylistModal.module.scss'

const cx = classNames.bind(styles)

function UploadModal() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const [state, dispatch] = useMusic()
  const uploadModal = useUploadModal()

  const onChange = (open) => {
    if (!open) {
      uploadModal.onClose()
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
      .createNewPlaylist(state.user.id, formData, state.user.accessToken)

    if (res.success) {
      toast.success('Tạo danh sách phát thành công!')
      uploadModal.onClose()
      setTitle('')
      setLoading(false)

      const playlist = await playlistService
        .getPlaylist(state.user.id, res._id, state.user.accessToken)
      const thumbnail = URL.createObjectURL(file)
      dispatch(actions.createPlaylist({ ...playlist, thumbnail }))
    } else {
      toast.error('Tạo mới không thành công')
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Tạo mới danh sách phát"
      isOpen={uploadModal.isOpen}
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
            Chọn hình ảnh
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
          Tạo mới
        </Button>
      </form>

    </Modal>
  )
}

export default UploadModal
