import { useState } from 'react'
import classNames from 'classnames/bind'

import { useUploadModal } from '~/hooks'
import Modal from '~/components/Modal'
import Input from '~/components/Input'
import Button from '~/components/Button'
import styles from './UploadModal.module.scss'

const cx = classNames.bind(styles)

function UploadModal() {
  const [loading, setLoading] = useState(false)

  const uploadModal = useUploadModal()

  const onChange = (open) => {
    if (!open) {
      uploadModal.onClose()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Modal
      title="Tạo danh sách phát"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        className={cx('form-upload')}
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          className={cx('input')}
          disabled={loading}
          placeholder="Nhập tên danh sách phát"
        />

        <div>
          <div className={cx('title-file-image')}>
            Chọn hình ảnh
          </div>
          <Input
            type="file"
            accept="image/*"
            disabled={loading}
            className={cx('input-file')}
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
