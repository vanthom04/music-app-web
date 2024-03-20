import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import toast from 'react-hot-toast'

import * as likedService from '~/services/likedService'
import { useUser, useLiked, useLoginModal } from '~/hooks'
import Button from '~/components/Button'

function LikeButton({ song, className }) {
  const [isLiked, setIsLiked] = useState(false)
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const liked = useLiked()
  const { user } = useUser()
  const loginModal = useLoginModal()

  useEffect(() => {
    if (!user || !song.id) return

    const checkLiked = async () => {
      const liked = await likedService.checkLiked(user.id, song.id, user.accessToken)
      setIsLiked(liked.isLiked)
    }

    checkLiked()
  }, [user, song.id])

  const handleLike = async () => {
    if (!user) return loginModal.onOpen()

    const check = await likedService.checkLiked(user.id, song.id, user.accessToken)
    if (check.isLiked) {
      const res = await likedService.removeSongId(user.id, song.id, user.accessToken)
      if (res.success) {
        toast.success('Xóa thành công')
        setIsLiked(false)
        liked.removeSong(song)
      }
    } else {
      const res = await likedService.addSongId(user.id, song.id, user.accessToken)
      if (res.success) {
        toast.success('Thêm thành công')
        setIsLiked(true)
        liked.addSong(song)
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
