import { create } from 'zustand'

const useDeletePlaylistModal = create((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
  }
})

export default useDeletePlaylistModal
