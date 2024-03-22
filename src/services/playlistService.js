import * as httpRequest from '~/utils/httpRequest'

export const createNewPlaylist = async (userId, data, token) => {
  try {
    const res = await httpRequest.post(`/playlist/${userId}`, data, {
      headers: { token: `Bearer ${token}` }
    })
    return res.playlist
  } catch (error) {
    throw new Error(error)
  }
}

export const getAllPlaylist = async (userId, token) => {
  try {
    const res = await httpRequest.get(`/playlist/${userId}`, {
      headers: { token: `Bearer ${token}` }
    })
    return res.playlist
  } catch (error) {
    throw new Error(error)
  }
}

export const getPlaylist = async (userId, playlistId, token) => {
  try {
    const res = await httpRequest.get(`/playlist/${userId}/${playlistId}`, {
      headers: { token: `Bearer ${token}` }
    })
    return res.playlist
  } catch (error) {
    throw new Error(error)
  }
}

export const addSongToPlaylist = async (userId, playlistId, songId, token) => {
  try {
    const res = await httpRequest.post(`/playlist/${userId}/${playlistId}/${songId}`, null, {
      headers: { token: `Bearer ${token}` }
    })
    return res.playlist
  } catch (error) {
    throw new Error(error)
  }
}

export const removeSongFormPlaylist = async (userId, playlistId, songId, token) => {
  try {
    const res = await httpRequest.remove(`/playlist/${userId}/${playlistId}/${songId}`, {
      headers: { token: `Bearer ${token}` }
    })
    return res.playlist
  } catch (error) {
    throw new Error(error)
  }
}

export const updatePlaylist = async (userId, playlistId, data, token) => {
  try {
    const res = await httpRequest.put(`/playlist/${userId}/${playlistId}`, data, {
      headers: { token: `Bearer ${token}` }
    })
    return res.playlist
  } catch (error) {
    throw new Error(error)
  }
}

export const deletePlaylist = async (userId, playlistId, token) => {
  try {
    const res = await httpRequest.remove(`/playlist/${userId}/${playlistId}`, {
      headers: { token: `Bearer ${token}` }
    })
    res.playlist
  } catch (error) {
    throw new Error(error)
  }
}
