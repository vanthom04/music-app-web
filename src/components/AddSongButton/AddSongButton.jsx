import classNames from 'classnames/bind'
import { LuPlus } from 'react-icons/lu'
import { useParams } from 'react-router-dom'

import { useMusic } from '~/context'
import { useAddSongModal } from '~/hooks'
import Button from '~/components/Button'
import styles from './AddSongButton.module.scss'

const cx = classNames.bind(styles)

function AddSongButton() {
  const [state] = useMusic()
  const { user } = state
  const addSongModal = useAddSongModal()
  const params = useParams()

  const handleClick = () => {
    if (!user) return
    addSongModal.setId(params.playlistId)
    addSongModal.onOpen()
  }

  return (
    <Button className={cx('btn-add')} onClick={handleClick}>
      <LuPlus className={cx('icon')} size={22} />
    </Button>
  )
}

export default AddSongButton
