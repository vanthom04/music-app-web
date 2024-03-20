import * as httpRequest from '~/utils/httpRequest'

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
