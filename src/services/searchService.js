import * as httpRequest from '~/utils/httpRequest'

export const searchSongs = async (name) => {
  try {
    const response = await httpRequest.get('/songs', {
      params: { name }
    })
    return response.songs
  } catch (error) {
    throw new Error(error)
  }
}
