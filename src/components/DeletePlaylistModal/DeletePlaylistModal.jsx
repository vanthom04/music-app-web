import classNames from 'classnames/bind'
import toast from 'react-hot-toast'

import { useMusic, actions } from '~/context'
import * as playlistService from '~/services/playlistService'
import { useMenuPlaylist, useDeletePlaylistModal } from '~/hooks'
import Modal from '~/components/Modal'
import Button from '~/components/Button'
import styles from './DeletePlaylistModal.module.scss'

const cx = classNames.bind(styles)

function DeletePlaylistModal() {
  const [state, dispatch] = useMusic()
  const { user } = state
  const menuPlaylist = useMenuPlaylist()
  const deletePlaylistModal = useDeletePlaylistModal()

  const onChange = (open) => {
    if (!open) {
      deletePlaylistModal.onClose()
    }
  }

  const handleClickSuccess = async () => {
    if (!user) return
    const res = await playlistService
      .deletePlaylist(user.id, menuPlaylist.info.id, user.accessToken)

    if (res.success) {
      dispatch(actions.deletePlaylist(menuPlaylist.info.id))
      toast.success('Xóa danh sách phát thành công!')
      deletePlaylistModal.onClose()
    } else {
      toast.error('Xóa danh sách phát không thành công!')
    }
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
