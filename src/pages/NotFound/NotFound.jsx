import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet-async'

import config from '~/config'
import Image from '~/components/Image'
import Button from '~/components/Button'
import styles from './NotFound.module.scss'

const cx = classNames.bind(styles)

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Không tìm thấy trang</title>
      </Helmet>

      <div className={cx('wrapper')}>
        <Image className={cx('logo')} src="/favicon.ico" alt="logo" />
        <h1 className={cx('title')}>Không tìm thấy trang</h1>
        <p className={cx('desc')}>Chúng tôi không tìm thấy trang bạn muốn tìm</p>
        <Button href={config.routes.home} className={cx('btn-home')}>
          Trang chủ
        </Button>
      </div>
    </>
  )
}

export default NotFound
