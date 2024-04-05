import {
  SET_USER,
  GET_ALL_SONGS,
  GET_LIKED,
  ADD_SONG_TO_LIKED,
  REMOVE_SONG_FROM_LIKED,
  GET_ALL_PLAYLIST,
  CREATE_PLAYLIST,
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_SONG_TO_PLAYLIST,
  REMOVE_SONG_FROM_PLAYLIST
} from './constants'

// user
export const setUser = (payload) => ({
  type: SET_USER,
  payload
})

// songs
export const getAllSongs = (payload) => ({
  type: GET_ALL_SONGS,
  payload
})

// liked
export const getLiked = (payload) => ({
  type: GET_LIKED,
  payload
})

export const addSongToLiked = (payload) => ({
  type: ADD_SONG_TO_LIKED,
  payload
})

export const removeSongFromLiked = (payload) => ({
  type: REMOVE_SONG_FROM_LIKED,
  payload
})

// playlist
export const getAllPlaylist = (payload) => ({
  type: GET_ALL_PLAYLIST,
  payload
})

export const createPlaylist = (payload) => ({
  type: CREATE_PLAYLIST,
  payload
})

export const updatePlaylist = (payload) => ({
  type: UPDATE_PLAYLIST,
  payload
})

export const deletePlaylist = (payload) => ({
  type: DELETE_PLAYLIST,
  payload
})


export const addSongToPlaylist = (payload) => ({
  type: ADD_SONG_TO_PLAYLIST,
  payload
})

export const removeSongFromPlaylist = (payload) => ({
  type: REMOVE_SONG_FROM_PLAYLIST,
  payload
})
