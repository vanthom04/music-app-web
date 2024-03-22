import { create } from 'zustand'

const usePlaylist = create((set) => {
  return {
    reload: false,
    onReload: () => set({ reload: true }),
    reset: () => set({ reload: false })
  }
})

export default usePlaylist
