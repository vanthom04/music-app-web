import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { useMusic, actions } from '~/context'
import * as likedService from '~/services/likedService'
import { useLoginModal } from '~/hooks'
import Button from '~/components/Button'

function LikeButton({ song, className }) {
  const [isLiked, setIsLiked] = useState(false)
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const [state, dispatch] = useMusic()
  const { user, liked } = state
  const loginModal = useLoginModal()

  useEffect(() => {
    if (!user || !song.id) return

    setIsLiked(liked.songs.some((item) => item.id === song.id))
  }, [user, song.id, liked])

  const handleLike = async () => {
    if (!user) return loginModal.onOpen()

    if (isLiked) {
      const res = await likedService.removeSongId(user.id, song.id, user.accessToken)
      if (res.success) {
        dispatch(actions.removeSongFromLiked(song))
        toast.success('Xóa thành công')
        setIsLiked(false)
      }
    } else {
      const res = await likedService.addSongId(user.id, song.id, user.accessToken)
      if (res.success) {
        dispatch(actions.addSongToLiked(song))
        toast.success('Thêm thành công')
        setIsLiked(true)
      }
    }
  }

  return (
    <Button className={className} onClick={handleLike}>
      <Icon color={isLiked ? '#22c55e' : '#fff'} />
    </Button>
  )
}

LikeButton.propTypes = {
  song: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default LikeButton
