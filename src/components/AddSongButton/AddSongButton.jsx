import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { LuPlus } from 'react-icons/lu'

import { useUser, useAddSongModal } from '~/hooks'
import Button from '~/components/Button'
import styles from './AddSongButton.module.scss'

const cx = classNames.bind(styles)

function AddSongButton({ playlistId }) {
  const { user } = useUser()
  const addSongModal = useAddSongModal()

  const handleClick = () => {
    if (!user) return
    addSongModal.setId(playlistId)
    addSongModal.onOpen()
  }

  return (
    <Button className={cx('btn-add')} onClick={handleClick}>
      <LuPlus className={cx('icon')} size={22} />
    </Button>
  )
}

AddSongButton.propTypes = {
  playlistId: PropTypes.string
}

export default AddSongButton
