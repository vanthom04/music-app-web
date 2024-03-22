import { create } from 'zustand'

const useUpdatePlaylistModal = create((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
  }
})

export default useUpdatePlaylistModal
