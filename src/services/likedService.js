import * as httpRequest from '~/utils/httpRequest'

export const getLiked = async (userId, token) => {
  try {
    const res = await httpRequest.get(`/liked/${userId}`, {
      headers: { token: `Bearer ${token}` }
    })
    return res.liked
  } catch (error) {
    throw new Error(error)
  }
}

export const checkLiked = async (userId, songId, token) => {
  try {
    return await httpRequest.get(`/liked/${userId}/${songId}`, {
      headers: { token: `Bearer ${token}` }
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const addSongId = async (userId, songId, token) => {
  try {
    const res = await httpRequest.post(`/liked/${userId}/${songId}`, null, {
      headers: { token: `Bearer ${token}` }
    })
    return res.liked
  } catch (error) {
    throw new Error(error)
  }
}

export const removeSongId = async (userId, songId, token) => {
  try {
    const res = await httpRequest.remove(`/liked/${userId}/${songId}`, {
      headers: { token: `Bearer ${token}` }
    })
    return res.liked
  } catch (error) {
    throw new Error(error)
  }
}
