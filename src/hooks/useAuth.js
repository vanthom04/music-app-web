import { useState } from 'react'
import jsCookie from 'js-cookie'
import toast from 'react-hot-toast'
import { signInWithPopup } from 'firebase/auth'

import useRouter from './useRouter'
import { useMusic, actions } from '~/context'
import * as authService from '~/services/authService'
import { auth, googleProvider, facebookProvider } from '~/config/firebase'

const useAuth = () => {
  const [loading, setLoading] = useState(false)

  const [, dispatch] = useMusic()
  const router = useRouter()

  const register = async (fullName, email, password) => {
    setLoading(true)
    const res = await authService.register(fullName, email, password)

    if (res.success) {
      setLoading(false)
      toast.success('Đăng ký tài khoản thành công!')

      jsCookie.set('accessToken', res.accessToken, {
        expires: 15,
        sameSite: 'strict',
        secure: !import.meta.env.DEV
      })
      router.reload()
    } else {
      setLoading(false)
      toast.error('Email đã tồn tại!')
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    const res = await authService.login(email, password)

    if (res.success) {
      setLoading(false)
      dispatch(actions.setUser(res))
      toast.success('Đăng nhập thành công!')

      jsCookie.set('accessToken', res.accessToken, {
        expires: 15,
        sameSite: 'strict',
        secure: !import.meta.env.DEV
      })
      router.reload()
    } else {
      setLoading(false)
      toast.error('Sai email hoặc mật khẩu!')
    }
  }

  const logout = async () => {
    jsCookie.remove('accessToken')
    dispatch(actions.setUser(undefined))
    router.reload()
  }

  const loginWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
  }

  const loginWithFacebook = async () => {
    signInWithPopup(auth, facebookProvider)
  }

  return { loading, register, login, logout, loginWithGoogle, loginWithFacebook }
}

export default useAuth
