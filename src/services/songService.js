import * as httpRequest from '~/utils/httpRequest'

export const getAllSongs = async () => {
  try {
    const response = await httpRequest.get('/songs')
    return response.songs
  } catch (error) {
    throw new Error(error)
  }
}

export const getSongById = async (songId, token) => {
  try {
    const response = await httpRequest.get(`/songs/${songId}`, {
      headers: { token: `Bearer ${token}` }
    })
    return response.song
  } catch (error) {
    throw new Error(error)
  }
}
