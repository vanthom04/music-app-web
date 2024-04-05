import { useState } from 'react'
import toast from 'react-hot-toast'
import classNames from 'classnames/bind'

import { useMusic } from '~/context'
import { validateEmail } from '~/utils/constants'
import { useAuth, useLoginModal, useRegisterModal } from '~/hooks'
import Modal from '~/components/Modal'
import Input from '~/components/Input'
import Image from '~/components/Image'
import Button from '~/components/Button'
import styles from './LoginModal.module.scss'

const cx = classNames.bind(styles)

function LoginModal() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useMusic()
  const { loading, login } = useAuth()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const onChange = (open) => {
    if (!open) {
      resetForm()
      loginModal.onClose()
    }
  }

  const handleClick = () => {
    if (loginModal.isOpen) {
      loginModal.onClose()
      registerModal.onOpen()
    }
    resetForm()
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error('Vui lòng nhập đầy đủ thông tin!')
    }
    if (!validateEmail(email.trim())) {
      return toast.error('Vui lòng nhập đúng email!')
    } else if (password.length < 6) {
      return toast.error('Mật khẩu phải nhiều hơn 6 kí tự!')
    }

    await login(email.trim(), password.trim())
  }

  return (
    <Modal
      title="Đăng nhập"
      description="Đăng nhập vào tài khoản của bạn"
      isOpen={loginModal.isOpen}
      onChange={onChange}
    >
      <div className={cx('social-media')}>
        <Button className={cx('btn-social')}>
          <Image
            className={cx('icon-social')}
            src="/assets/icons/google_icon.png"
            alt="Google"
          />
          <p className={cx('text')}>Đăng nhập với Google</p>
        </Button>
        <Button className={cx('btn-social')}>
          <Image
            className={cx('icon-social')}
            src="/assets/icons/facebook_icon.png"
            alt="Google"
          />
          <p className={cx('text')}>Đăng nhập với Facebook</p>
        </Button>
      </div>

      <div className={cx('or')}>
        Hoặc
      </div>

      <form
        className={cx('form-login')}
        onSubmit={handleSubmitLogin}
      >
        <div>
          <div className={cx('label')}>Email</div>
          <Input
            type="text"
            value={email}
            className={cx('input')}
            placeholder="Nhập email của bạn"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <div className={cx('label')}>Mật khẩu</div>
          <Input
            type="password"
            value={password}
            className={cx('input')}
            placeholder="Nhập mật khẩu của bạn"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          className={cx('btn-login')}
          disabled={loading}
        >
          {!loading ? 'Đăng nhập' : 'Đăng nhập...'}
        </Button>
      </form>

      <div className={cx('more')}>
        <p className={cx('forgot-password')}>Quên mật khẩu</p>
        <p className={cx('dont-have-account')}>
          Bạn chưa có tài khoản?
          <Button
            className={cx('btn')}
            onClick={handleClick}
          >
            Đăng ký
          </Button>
        </p>
      </div>
    </Modal>
  )
}

export default LoginModal
