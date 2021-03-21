import React, { useEffect, useRef, useState } from 'react'
import { getSortByFn } from '../../helpers/array-helper'
import { getPopupStyle, getWidth } from '../../helpers/position-helper'
import { SearchInput } from './SearchInput'

export const PopUp = (props) => {

  const {
    items,
    selectedItem,
    setSelectedItem,
    sortBy,
    onItemSelected: handleItemSelected,
    close,
    hasSearch,
    hasClear,
    parentContainerRef,
    triggerRef
  } = props

  const itemsContainerRef = useRef(null)

  const [style, setStyle] = useState({})
  const [searchValue, setSearchValue] = useState('')

  const [filteredItems, setFilteredItems] = useState(null)

  const getItems = () => {
    if (sortBy) {
      return items.sort(getSortByFn(sortBy))
    } else {
      return items
    }
  }

  useEffect(() => {
    let _style = getPopupStyle(parentContainerRef, triggerRef)
    setStyle(_style)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    filterItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  useEffect(() => {
    filterItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  useEffect(() => {
    if (itemsContainerRef.current) {
      let _style = getPopupStyle(parentContainerRef, triggerRef)
      _style.width = getWidth(itemsContainerRef).toString() + 'px'
      setStyle(_style)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContainerRef.current])

  const handleClick = (item) => {
    handleItemSelected(item)
    close()
  }

  const handleSearchValueChanged = (value) => { setSearchValue(value) }

  const filterItems = () => {
    setFilteredItems(getItems().filter((item) => {
      return item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    }))
  }

  const isClearable = () => hasClear && !!selectedItem

  const clear = () => {
    setSelectedItem(null)
    close()
  }

  const renderItems = () => {

    const getClass = (item) => {
      let classes = ['item']

      if (selectedItem === item) {
        classes.push('selected')
      }

      return classes.join(' ')
    }

    return (
      <React.Fragment>
        {filteredItems && filteredItems.map((item, i) => (
          <div
            onClick={() => {
              handleClick(item)
            }}
            className={getClass(item)}
            key={i}
          >
            {item.name}
          </div>
        ))}
      </React.Fragment>
    )
  }

  return (
    <div className='popup select-popup' style={style}>
      {hasSearch &&
        <div className='search-container'>
          <SearchInput
            onChange={handleSearchValueChanged}
            items={items}
          ></SearchInput>
        </div>
      }
      <div
        className='items-container'
        ref={itemsContainerRef}
      >
        {renderItems()}
      </div>
      <div className='control-buttons-container'>
        {isClearable() && (
          <div
            className='control-button'
            onClick={clear}
          >
            <span>clear</span>
          </div>
        )}
      </div>
    </div>
  )
}