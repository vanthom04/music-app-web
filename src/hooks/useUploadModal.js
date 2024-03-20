import { create } from 'zustand'

const useUploadModal = create((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
  }
})

export default useUploadModal
