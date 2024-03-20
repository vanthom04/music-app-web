import { create } from 'zustand'

const useLoginModal = create((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
  }
})

export default useLoginModal
