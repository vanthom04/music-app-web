import Helmet from 'react-helmet-async'
import classNames from 'classnames/bind'

import styles from './Profile.module.scss'

const cx = classNames.bind(styles)

function Profile() {
  return (
    <>
      <Helmet>
        <title>Cài đặt</title>
      </Helmet>

      <div className={cx('wrapper')}>
        <h1>Profile</h1>
      </div>
    </>
  )
}

export default Profile
