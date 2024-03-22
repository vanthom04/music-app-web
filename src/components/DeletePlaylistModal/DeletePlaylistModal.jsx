import classNames from 'classnames/bind'
import toast from 'react-hot-toast'

import * as playlistService from '~/services/playlistService'
import { useUser, useMenuPlaylist, useDeletePlaylistModal, usePlaylist } from '~/hooks'
import Modal from '~/components/Modal'
import Button from '~/components/Button'
import styles from './DeletePlaylistModal.module.scss'

const cx = classNames.bind(styles)

function DeletePlaylistModal() {
  const { user } = useUser()
  const playlist = usePlaylist()
  const menuPlaylist = useMenuPlaylist()
  const deletePlaylistModal = useDeletePlaylistModal()

  const onChange = (open) => {
    if (!open) {
      deletePlaylistModal.onClose()
    }
  }

  const handleClickSuccess = async () => {
    if (!user) return
    await playlistService.deletePlaylist(user.id, menuPlaylist.info.id, user.accessToken)
    toast.success('Xóa danh sách phát thành công!')
    deletePlaylistModal.onClose()
    playlist.onReload()
  }

  return (
    <Modal
      title="Xóa khỏi Thư viện?"
      isOpen={deletePlaylistModal.isOpen}
      onChange={onChange}
    >
      <div className={cx('container')}>
        <p className={cx('desc')}>
          Thao tác này sẽ xóa
          <b> {menuPlaylist.info.title} </b>
          khỏi Thư viện.
        </p>
        <div className={cx('footer')}>
          <Button
            className={cx('btn', 'btn-cancel')}
            onClick={() => deletePlaylistModal.onClose()}
          >
            Hủy
          </Button>
          <Button
            className={cx('btn', 'btn-success')}
            onClick={handleClickSuccess}
          >
            Xóa
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeletePlaylistModal
