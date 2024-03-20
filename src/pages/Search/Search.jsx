import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FaRegTimesCircle } from 'react-icons/fa'
import { FaSpinner } from 'react-icons/fa'

import { useUser } from '~/hooks'
import * as searchService from '~/services/searchService'
import { useDebounce } from '~/hooks'
import Input from '~/components/Input'
import SearchContent from './SearchContent'
import Button from '~/components/Button'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function Search() {
  const { user } = useUser()

  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')
  const debounceValue = useDebounce(searchQuery, 500)

  const inputRef = useRef()

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)

      const result = await searchService.searchSongs(debounceValue)
      setSongs(result)
      setLoading(false)
    }

    fetchApi()
  }, [user, debounceValue])

  const handleClear = () => {
    setSearchParams({ query: '' })
    setSongs([])
    inputRef.current.focus()
  }

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Tìm kiếm</h1>
      <div className={cx('form-search')}>
        <Input
          ref={inputRef}
          value={searchQuery || ''}
          className={cx('search-input')}
          placeholder="Nhập tên bài hát bạn muốn tìm kiếm"
          onChange={e => setSearchParams({ q: e.target.value })}
        />
        {!!searchQuery && !loading && (
          <Button className={cx('clear')} onClick={handleClear}>
            <FaRegTimesCircle size={16} />
          </Button>
        )}
        {loading && <FaSpinner className={cx('loading')} size={16} />}
      </div>
      <SearchContent songs={songs} />
    </div>
  )
}

export default Search
