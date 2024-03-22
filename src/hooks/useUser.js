import { useState, useEffect } from 'react'
import jsCookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'

import useRouter from './useRouter'
import useLoginModal from './useLoginModal'
import useRegisterModal from './useRegisterModal'
import * as authService from '~/services/authService'

const useUser = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkLoggedIn = async () => {
      const accessToken = jsCookie.get('accessToken')
      if (!accessToken || accessToken === 'undefined') {
        return setUser(null)
      }

      const decoded = jwtDecode(accessToken)
      const user = await authService.getUser(decoded.userId, accessToken)
      setUser({ ...user, accessToken })
    }

    checkLoggedIn()
  }, [])

  const register = async (username, email, password) => {
    try {
      setLoading(true)
      const res = await authService.register(username.trim(), email.trim(), password.trim())
      if (res && !res.isActive) {
        toast.success('Đăng ký thành công!\nVui lòng xác minh email và đăng nhập lại!')
        registerModal.onClose()
        loginModal.onOpen()
        setLoading(false)
        return true
      }
    } catch (error) {
      setLoading(false)
      toast.error('Tên đăng nhập hoặc email đã tồn tại!')
      return false
    }
  }

  const login = async (username, password) => {
    try {
      setLoading(true)
      const res = await authService.login(username.trim(), password.trim())

      if (res.success && res.isActive) {
        setUser(res)
        setLoading(false)
        toast.success('Đăng nhập thành công!')

        jsCookie.set('accessToken', res.accessToken, {
          expires: 15,
          sameSite: 'strict',
          secure: false
        })
        router.reload()
        return true
      } else {
        toast.error('Vui lòng xác minh tài khoản trong email!')
        setLoading(false)
        return false
      }
    } catch (error) {
      setLoading(false)
      toast.error('Sai tên đăng nhập hoặc mật khẩu')
      return false
    }
  }

  const logout = () => {
    jsCookie.remove('accessToken')
    setUser(null)
    router.reload()
  }

  return { user, loading, register, login, logout }
}

export default useUser
