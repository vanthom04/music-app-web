import classNames from 'classnames/bind'
import { CgSearch } from 'react-icons/cg'
import { HiMiniHome } from 'react-icons/hi2'

import config from '~/config'
import Library from './Library'
import Menu, { MenuItem } from './Menu'
import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles)

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem
          to={config.routes.home}
          title="Trang chủ"
          icon={<HiMiniHome size={24} />}
        />
        <MenuItem
          to={config.routes.search}
          title="Tìm kiếm"
          icon={<CgSearch size={24} />}
        />
      </Menu>
      <Library />
    </aside>
  )
}

export default Sidebar
