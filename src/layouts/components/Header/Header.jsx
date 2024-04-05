import { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import jsCookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

import * as authService from '~/services/authService'
import { useMusic, actions } from '~/context'
import { useRouter } from '~/hooks'
import { useLoginModal, useRegisterModal } from '~/hooks'
import AccountPopover from './AccountPopover'
import Button from '~/components/Button'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header({ title }) {
  const [state, dispatch] = useMusic()
  const { user } = state

  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()


  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!user) {
        const accessToken = jsCookie.get('accessToken')
        if (!accessToken || accessToken === 'undefined') {
          return dispatch(actions.setUser(undefined))
        }

        const decoded = jwtDecode(accessToken)
        const user = await authService.getUser(decoded.userId, accessToken)
        dispatch(actions.setUser({ ...user, accessToken }))
      }
    }

    checkLoggedIn()
  }, [dispatch, user])

  return (
    <header className={cx('wrapper')}>
      <div className={cx('navigation')}>
        <Button className={cx('btn')} onClick={() => router.back()}>
          <FaChevronLeft className={cx('icon')} size={18} />
        </Button>
        <Button className={cx('btn')} onClick={() => router.forward()}>
          <FaChevronRight className={cx('icon')} size={18} />
        </Button>
      </div>
      <h1 className={cx('title')}>{title}</h1>
      <div className={cx('actions')}>
        {user ? (
          <AccountPopover />
        ) : (
          <>
            <Button
              className={cx('btn', 'btn-register')}
              onClick={() => registerModal.onOpen()}
            >
              Đăng ký
            </Button>
            <Button
              className={cx('btn', 'btn-login')}
              onClick={() => loginModal.onOpen()}
            >
              Đăng nhập
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header
