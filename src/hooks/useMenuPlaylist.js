import { create } from 'zustand'

const useMenuPlaylist = create((set) => {
  return {
    isOpen: false,
    info: { id: '', title: '' },
    position: { x: 0, y: 0 },
    setInfo: (id, title) => set({ info: { id, title } }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setPosition: (x, y) => set({ position: { x, y } })
  }
})

export default useMenuPlaylist
