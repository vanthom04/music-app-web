import { useState } from 'react'
import toast from 'react-hot-toast'
import classNames from 'classnames/bind'

import { useUser, useLoginModal, useRegisterModal } from '~/hooks'
import Modal from '~/components/Modal'
import Input from '~/components/Input'
import Image from '~/components/Image'
import Button from '~/components/Button'
import styles from './RegisterModal.module.scss'

const cx = classNames.bind(styles)

function RegisterModal() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { loading, register } = useUser()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const resetForm = () => {
    setUsername('')
    setEmail('')
    setPassword('')
  }

  const onChange = (open) => {
    if (!open) {
      resetForm()
      registerModal.onClose()
    }
  }

  const handleClick = () => {
    if (registerModal.isOpen) {
      registerModal.onClose()
      loginModal.onOpen()
    }
    resetForm()
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault()
    if (!username || !email || !password) {
      return toast.error('Vui lòng nhập đầy đủ thông tin!')
    }

    register(username, email, password)
  }

  return (
    <Modal
      title="Đăng ký"
      description="Đăng ký tài khoản của bạn"
      isOpen={registerModal.isOpen}
      onChange={onChange}
    >
      <div className={cx('social-media')}>
        <Button className={cx('btn-social')}>
          <Image
            className={cx('icon-social')}
            src="/assets/icons/google_icon.png"
            alt="Google"
          />
          <p className={cx('text')}>Đăng ký bằng Google</p>
        </Button>
        <Button className={cx('btn-social')}>
          <Image
            className={cx('icon-social')}
            src="/assets/icons/facebook_icon.png"
            alt="Google"
          />
          <p className={cx('text')}>Đăng ký bằng Facebook</p>
        </Button>
      </div>

      <div className={cx('or')}>
        Hoặc
      </div>

      <form
        className={cx('form-login')}
        onSubmit={handleSubmitRegister}
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
          {!loading ? 'Đăng ký' : 'Đăng ký...'}
        </Button>
      </form>

      <div className={cx('more')}>
        <p className={cx('have-account')}>
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

export default RegisterModal
