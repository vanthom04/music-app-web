import { useState } from 'react'
import toast from 'react-hot-toast'
import classNames from 'classnames/bind'

import { useAuth } from '~/hooks'
import { validateEmail } from '~/utils/constants'
import { useLoginModal, useRegisterModal } from '~/hooks'
import Modal from '~/components/Modal'
import Input from '~/components/Input'
import Image from '~/components/Image'
import Button from '~/components/Button'
import styles from './RegisterModal.module.scss'

const cx = classNames.bind(styles)

function RegisterModal() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { register, loading } = useAuth()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const resetForm = () => {
    setFullName('')
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

  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    if (!fullName || !email || !password) {
      return toast.error('Vui lòng nhập đầy đủ thông tin!')
    } else if (!validateEmail(email.trim())) {
      return toast.error('Vui lòng nhập đúng email!')
    } else if (password.length < 6) {
      return toast.error('Mật khẩu phải nhiều hơn 6 kí tự!')
    }

    await register(fullName, email, password)
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

      <div className={cx('or')}>Hoặc</div>

      <form
        className={cx('form-login')}
        onSubmit={handleSubmitRegister}
      >
        <div>
          <div className={cx('label')}>Họ và tên</div>
          <Input
            type="text"
            value={fullName}
            className={cx('input')}
            placeholder="Nhập tên của bạn"
            onChange={(e) => setFullName(e.target.value)}
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
