import * as httpRequest from '~/utils/httpRequest'

export const login = async (email, password) => {
  try {
    const res = await httpRequest.post('/auth/login', {
      email,
      password
    })
    return res.user
  } catch (error) {
    throw new Error(error)
  }
}

export const register = async (fullName, email, password) => {
  try {
    const res = await httpRequest.post('/auth/register', {
      fullName,
      email,
      password
    })
    return res.user
  } catch (error) {
    throw new Error(error)
  }
}

export const getUser = async (userId, token) => {
  try {
    const res = await httpRequest.get(`/users/${userId}`, {
      headers: { token: `Bearer ${token}` }
    })
    return res.user
  } catch (error) {
    throw new Error(error)
  }
}
