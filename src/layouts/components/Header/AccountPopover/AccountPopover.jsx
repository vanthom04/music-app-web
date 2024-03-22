import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'

import { useUser } from '~/hooks'
import MenuItem from './MenuItem'
import styles from './AccountPopover.module.scss'
import Image from '~/components/Image'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
  {
    label: 'Trang chủ'
  },
  {
    label: 'Tài khoản'
  },
  {
    label: 'Cài đặt'
  }
]

function AccountPopover() {
  const { user, logout } = useUser()

  const handleClickItem = (item) => {
    // eslint-disable-next-line no-console
    console.log(item)
  }

  if (!user) return null

  const renderResult = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <header className={cx('header-menu')}>
        <h4 className={cx('title')}>{user.displayName || user.username}</h4>
        <p className={cx('email')}>{user.email}</p>
      </header>
      {MENU_ITEMS.map((item) => (
        <MenuItem
          key={item.label}
          data={item}
          onClick={() => handleClickItem(item)}
        />
      ))}
      <footer className={cx('footer-menu')}>
        <Button className={cx('btn-logout')} onClick={() => logout()}>
          Đăng xuất
        </Button>
      </footer>
    </div>
  )

  return (
    <Tippy
      interactive
      trigger="click"
      placement="bottom-end"
      render={renderResult}
    >
      <Image
        className={cx('avatar')}
        src="https://i.imgur.com/l8Zh2zx.png"
        alt="Avatar"
      />
    </Tippy>
  )
}

export default AccountPopover
