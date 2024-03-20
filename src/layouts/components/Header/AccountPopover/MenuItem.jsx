import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import Button from '~/components/Button'
import styles from './AccountPopover.module.scss'

const cx = classNames.bind(styles)

function MenuItem({ data, onClick }) {
  const classes = cx('menu-item', {
    separate: data.separate
  })
  return (
    <Button className={classes} onClick={onClick}>
      {data.label}
    </Button>
  )
}

MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

export default MenuItem
