import * as httpRequest from '~/utils/httpRequest'

export const login = async (username, password) => {
  try {
    const res = await httpRequest.post('/auth/login', {
      username,
      password
    })
    return res.user
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Sai tên đăng nhập hoặc mật khẩu')
    } else {
      throw new Error(error)
    }
  }
}

export const register = async (username, email, password) => {
  try {
    const res = await httpRequest.post('/auth/register', {
      username,
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
