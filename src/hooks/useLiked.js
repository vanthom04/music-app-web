import { create } from 'zustand'

const useLiked = create((set) => {
  return {
    songs: [],
    addSong: (song) => set((state) => ({ songs: state.songs.concat(song) })),
    removeSong: (song) => set((state) => {
      return { songs: state.songs.filter(s => s.id !== song.id) }
    }),
    setSongs: (songs) => set({ songs }),
    reset: () => set({ songs: [] })
  }
})

export default useLiked
