import React, { useEffect, useRef, useState } from 'react'
import { getSortByFn } from '../../helpers/array-helper'
import { getPopupStyle, getWidth } from '../../helpers/position-helper'
import { OBJECT_PROPERTY_NAME } from '../table/constants'

export const AutoComplete = (props) => {

  const {
    onItemSelected: handleItemSelected,
    onEnterPressed: handleEnterPressed,
    items,
    parentContainerRef
  } = props

  const itemsContainerRef = useRef(null)

  const [style, setStyle] = useState({})

  const inputRef = useRef(null)

  const setFocus = () => {
    inputRef.current
      && inputRef.current.focus()
  }

  const hide = () => { props.setIsSearchVisible(false) }

  const [searchValue, setSearchValue] = useState('')

  const handleSearchValueChanged = (e) => {
    setSearchValue(e.target.value)
  }

  const getfilteredItems = () => {
    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    })
  }

  useEffect(() => {
    setFocus()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef.current])

  useEffect(() => {
    if (itemsContainerRef.current) {
      let _style = getPopupStyle(parentContainerRef, inputRef)
      _style.width = getWidth(itemsContainerRef).toString() + 'px'
      setStyle(_style)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContainerRef.current])

  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        hide()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef])

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        hide()
        break
      case 'Enter':
        handleEnterPressed(e.target.value)
        setSearchValue('')
        hide()
        break
      default:
        break
    }
  }

  const renderPopUp = () => {
    return (
      <div
        style={style}
        className='popup'
      >
        <div
          className='items-container'
          ref={itemsContainerRef}
        >
          {items && getfilteredItems().sort(getSortByFn(OBJECT_PROPERTY_NAME)).map((item, i) => (
            <div
              className='item'
              onClick={() => {
                handleItemSelected(item)
                setSearchValue('')
                setFocus()
              }}
              key={i}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className='container'
      ref={containerRef}
    >
      <input
        type='text'
        className='tag-input'
        value={searchValue}
        onChange={handleSearchValueChanged}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      ></input>

      {getfilteredItems().length > 0 && (
        renderPopUp()
      )}

    </div>
  )
}