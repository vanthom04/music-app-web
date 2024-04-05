import { Helmet } from 'react-helmet-async'
import classNames from 'classnames/bind'

import styles from './Setting.module.scss'

const cx = classNames.bind(styles)

function Setting() {
  return (
    <>
      <Helmet>
        <title>Cài đặt</title>
      </Helmet>

      <div className={cx('wrapper')}>
        <h1>Settings</h1>
      </div>
    </>
  )
}

export default Setting
