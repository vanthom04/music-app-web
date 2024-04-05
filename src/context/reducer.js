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

export const initState = {
  user: undefined,
  allSongs: [],
  liked: {},
  allPlaylist: []
}

const reducer = (state, action) => {
  switch (action.type) {
    // user
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    // songs
    case GET_ALL_SONGS:
      return {
        ...state,
        allSongs: [...action.payload]
      }
    // liked
    case GET_LIKED:
      return {
        ...state,
        liked: { ...action.payload }
      }
    case ADD_SONG_TO_LIKED:
      return {
        ...state,
        liked: {
          ...state.liked,
          songs: [...state.liked.songs, action.payload]
        }
      }
    case REMOVE_SONG_FROM_LIKED:
      return {
        ...state,
        liked: {
          ...state.liked,
          songs: state.liked.songs.filter(s => s.id !== action.payload.id)
        }
      }
    // playlist
    case GET_ALL_PLAYLIST:
      return {
        ...state,
        allPlaylist: [...action.payload]
      }
    case CREATE_PLAYLIST:
      return {
        ...state,
        allPlaylist: [...state.allPlaylist, action.payload]
      }
    case UPDATE_PLAYLIST:
      return {
        ...state,
        allPlaylist: [...state.allPlaylist.filter(p => p.id !== action.payload.id), {
          ...state.allPlaylist.filter(p => p.id === action.payload.id)[0],
          title: action.payload.title,
          thumbnail: action.payload.thumbnail
        }]
      }
    case DELETE_PLAYLIST:
      const delPlaylist = state.allPlaylist.filter(p => p.id === action.payload)
      delPlaylist && URL.revokeObjectURL(delPlaylist.thumbnail)
      return {
        ...state,
        allPlaylist: [...state.allPlaylist.filter(p => p.id !== action.payload)]
      }
    case ADD_SONG_TO_PLAYLIST:
      const addPrevPlaylist = state.allPlaylist.filter(p => p.id !== action.payload.playlistId)
      const addPlaylist = state.allPlaylist.filter(p => p.id === action.payload.playlistId)[0]
      return {
        ...state,
        allPlaylist: [...addPrevPlaylist, {
          ...addPlaylist,
          songs: [...addPlaylist.songs, action.payload.song]
        }]
      }
    case REMOVE_SONG_FROM_PLAYLIST:
      const removePrevPlaylist = state.allPlaylist
        .filter(p => p.id !== action.payload.playlistId)
      const removePlaylist = state.allPlaylist
        .filter(p => p.id === action.payload.playlistId)[0]
      return {
        ...state,
        allPlaylist: [...removePrevPlaylist, {
          ...removePlaylist,
          songs: removePlaylist.songs.filter(s => s.id !== action.payload.song.id)
        }]
      }
    // default
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

export default reducer
