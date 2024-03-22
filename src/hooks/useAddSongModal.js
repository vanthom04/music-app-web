import { create } from 'zustand'

const useAddSongModal = create((set) => {
  return {
    isOpen: false,
    playlistId: undefined,
    setId: (id) => set({ playlistId: id }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
  }
})

export default useAddSongModal