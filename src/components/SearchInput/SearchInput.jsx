import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import classNames from 'classnames/bind'
import { FaRegTimesCircle } from 'react-icons/fa'
import { FaSpinner } from 'react-icons/fa'

import Input from '~/components/Input'
import Button from '~/components/Button'
import styles from './SearchInput.module.scss'

const cx = classNames.bind(styles)

const SearchInput = forwardRef(({ value, loading, onChange, handleClear }, ref) => {
  return (
    <div className={cx('search-group')}>
      <Input
        ref={ref}
        value={value || ''}
        className={cx('search-input')}
        placeholder="Nhập tên bài hát bạn muốn tìm kiếm"
        onChange={onChange}
      />
      {!!value && !loading && (
        <Button className={cx('clear')} onClick={handleClear}>
          <FaRegTimesCircle size={16} />
        </Button>
      )}
      {loading && <FaSpinner className={cx('loading')} size={16} />}
    </div>
  )
})

SearchInput.propTypes = {
  value: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  handleClear: PropTypes.func
}

export default SearchInput