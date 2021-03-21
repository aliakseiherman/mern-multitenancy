import React, { useEffect, useState } from 'react'
import { SearchInput } from './SearchInput'
import { getSortByFn } from '../../helpers/array-helper'
import { getPopupStyle, getWidth } from '../../helpers/position-helper'
import { useRef } from 'react'

export const PopUp = (props) => {

  const {
    items,
    selectedItems,
    isItemsOutside,
    sortBy,
    onItemSelected: handleItemSelected,
    onItemClicked: handleItemClicked,
    hasSearch,
    hasClear,
    onAllItemsUnselected: handleAllItemsUnselected,
    onAllItemsSelected: handleAllItemsSelected,
    onCreateNewItem: handleCreateNewItem,
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

  const handleSearchValueChanged = (value) => { setSearchValue(value) }

  const filterItems = () => {
    setFilteredItems(getItems().filter((item) => {
      return item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    }))
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

    if (isItemsOutside) {
      handleItemSelected(item)
    } else {
      handleItemClicked(item)
    }
  }

  const renderItems = () => {

    const getClass = (item) => {
      let classes = ['item']

      if (!isItemsOutside) {
        if (selectedItems.indexOf(item) !== -1) {
          classes.push('selected')
        }
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

  const isClearable = () => { return !isItemsOutside && selectedItems && hasClear && selectedItems.length > 0 }

  const handleEnterPressed = () => {
    handleCreateNewItem &&
      handleCreateNewItem(searchValue)
  }

  const isHitEnterMessageVisible = () =>
    filteredItems
    && filteredItems.length === 0
    && handleCreateNewItem
    && searchValue.length > 0

  const isSelectAllButtonVisible = () => {
    let result = false

    if (!isHitEnterMessageVisible()) {
      result =
        isItemsOutside
          ? items.length > 0
          : selectedItems.length < items.length
    }

    return result
  }

  return (
    <div className='popup select-popup' style={style}>

      {hasSearch ?
        (
          <React.Fragment>
            <div className='search-container'>
              <SearchInput
                onEnterPressed={handleEnterPressed}
                onChange={handleSearchValueChanged}
                items={items}
              ></SearchInput>
            </div>
            {isHitEnterMessageVisible() &&
              <div className='multi-select-popup-notification'>hit enter to create a new item</div>
            }
            <div
              className='items-container'
              ref={itemsContainerRef}
            >
              {renderItems()}
            </div>
            <div className='control-buttons-container'>
              <div className='control-buttons-flex-wrapper'>
                {isClearable() && (
                  <div
                    className='control-button'
                    onClick={handleAllItemsUnselected}
                  >
                    <span>clear</span>
                  </div>
                )}
                {isSelectAllButtonVisible() &&
                  <div
                    className='control-button'
                    onClick={handleAllItemsSelected}
                  >
                    <span>select all</span>
                  </div>
                }
              </div>
            </div>
          </React.Fragment>
        ) : (
          renderItems()
        )
      }

    </div>
  )
}