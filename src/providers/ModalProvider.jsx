import { useState, useEffect } from 'react'

import LoginModal from '~/components/LoginModal'
import RegisterModal from '~/components/RegisterModal'
import AddSongModal from '~/components/AddSongModal'
import UploadPlaylistModal from '~/components/UploadPlaylistModal'
import UpdatePlaylistModal from '~/components/UpdatePlaylistModal'
import DeletePlaylistModal from '~/components/DeletePlaylistModal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <AddSongModal />
      <UploadPlaylistModal />
      <UpdatePlaylistModal />
      <DeletePlaylistModal />
    </>
  )
}

export default ModalProvider
