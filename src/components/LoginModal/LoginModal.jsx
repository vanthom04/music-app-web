import { useState } from 'react'
import toast from 'react-hot-toast'
import classNames from 'classnames/bind'

import { useUser } from '~/hooks'
import { useLoginModal, useRegisterModal } from '~/hooks'
import Modal from '~/components/Modal'
import Input from '~/components/Input'
import Image from '~/components/Image'
import Button from '~/components/Button'
import styles from './LoginModal.module.scss'

const cx = classNames.bind(styles)

function LoginModal() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const { loading, login } = useUser()

  const resetForm = () => {
    setUsername('')
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
    if (!username || !password) {
      return toast.error('Vui lòng nhập đầy đủ thông tin!')
    }

    login(username, password)
    loginModal.onClose()
    resetForm()
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
          <div className={cx('label')}>Tên đăng nhập</div>
          <Input
            type="text"
            value={username}
            className={cx('input')}
            placeholder="Nhập tên đăng nhập của bạn"
            onChange={(e) => setUsername(e.target.value)}
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
