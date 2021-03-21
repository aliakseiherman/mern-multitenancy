import React, { useEffect, useRef, useState } from 'react'

export const SearchInput = (props) => {

  const {
    onChange: _handleChange,
    onEnterPressed: handleEnterPressed,
    items,
    isAutoFocus
  } = props

  const [value, _setValue] = useState('')
  const setValue = (value) => {
    _setValue(value)
    _handleChange(value)
  }

  const inputRef = useRef(null)

  const handleChange = (e) => { setValue(e.target.value) }

  useEffect(() => {
    isAutoFocus &&
      inputRef.current.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef.current])

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        break
      case 'Enter':
        handleEnterPressed(value)
        setTimeout(() => { setValue('') }, 500)
        break
      default:
        break
    }
  }

  return (
    <input
      type='text'
      placeholder={items.length > 0 ? 'search...' : 'add new...'}
      className='multi-select-search'
      value={value}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      ref={inputRef}
    />
  )
}