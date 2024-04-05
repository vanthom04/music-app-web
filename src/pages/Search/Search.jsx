import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import classNames from 'classnames/bind'

import * as searchService from '~/services/searchService'
import { useDebounce } from '~/hooks'
import SearchInput from '~/components/SearchInput'
import SearchContent from './SearchContent'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function Search() {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)

  const inputRef = useRef()

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')
  const debounceValue = useDebounce(searchQuery, 500)

  useEffect(() => {
    if (!debounceValue) return

    const fetchApi = async () => {
      setLoading(true)

      const result = await searchService.searchSongs(debounceValue)
      setSongs(result)
      setLoading(false)
    }

    fetchApi()
  }, [debounceValue])

  const handleClear = () => {
    setSearchParams({ query: '' })
    setSongs([])
    inputRef.current?.focus()
  }

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Tìm kiếm</h1>
      <SearchInput
        ref={inputRef}
        value={searchQuery}
        loading={loading}
        onChange={(e) => setSearchParams({ q: e.target.value })}
        handleClear={handleClear}
      />
      {!!debounceValue && <SearchContent songs={songs} />}
    </div>
  )
}

export default Search
