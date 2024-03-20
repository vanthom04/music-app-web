import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import Header from '~/layouts/components/Header'
import Sidebar from '~/layouts/components/Sidebar'
import Player from '~/layouts/components/Player'
import styles from './DefaultLayout.module.scss'
import { useState } from 'react'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
  const [active, setActive] = useState(false)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container', { active })}>
        <Sidebar />
        <div className={cx('view-content')}>
          <Header />
          <main className={cx('content')}>{children}</main>
        </div>
      </div>
      <Player setActive={setActive} active />
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default DefaultLayout
