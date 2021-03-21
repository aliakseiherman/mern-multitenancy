import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../button/Button'
import { PopUp } from './PopUp'
import { SelectedItems } from './SelectedItems'
import '../../assets/styles/feasible-ui.css'

export const MultiSelect = (props) => {

  const {
    parentContainerRef,
    sortBy,
    hasSearch,
    hasClear,
    label,
    isItemsOutside,
    selectedItems,
    setSelectedItems,
    onSelected: _handleItemSelected,
    onUnselected: _handleItemUnselected,
    onCreateNewItem: _handleCreateNewItem
  } = props

  const [isPopUpVisible, setIsPopUpVisible] = useState(false)

  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(props.items)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.items])

  const containerRef = useRef(null)
  const buttonRef = useRef(null)

  const handleItemSelected = (item) => {
    setSelectedItems(oldItems => [...oldItems, item])
    _handleItemSelected && _handleItemSelected(item)
  }

  const handleItemUnselected = (item) => {
    setSelectedItems(selectedItems.filter(_item => _item.name !== item.name))
    _handleItemUnselected && _handleItemUnselected(item)
  }

  const handleAllItemsUnselected = () => {
    setSelectedItems([])
  }

  const handleAllItemsSelected = () => {
    setSelectedItems([])
    setSelectedItems(items)

    if (isItemsOutside) {
      setIsPopUpVisible(false)
    }
  }

  const handleItemClicked = (item) => {
    if (selectedItems.indexOf(item) > -1) {
      handleItemUnselected(item)
    } else {
      handleItemSelected(item)
    }
  }

  const getUnselectedItems = () => {
    if (isItemsOutside) {
      return items.filter((item) => {
        return selectedItems.indexOf(item) === -1
      })
    } else {
      return items
    }
  }

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsPopUpVisible(false)
    }
  }

  useEffect(() => {
    if (isPopUpVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPopUpVisible])

  useEffect(() => {
    if (isPopUpVisible
      && getUnselectedItems().length === 0
      && !_handleCreateNewItem) {
      setIsPopUpVisible(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems])

  const showPopUp = () => {
    if (_handleCreateNewItem) {
      setIsPopUpVisible(true)
      return
    }

    if (isItemsOutside) {
      setIsPopUpVisible(getUnselectedItems().length > 0)
    } else {
      setIsPopUpVisible(true)
    }
  }

  const handleCreateNewItem = (value) => {
    _handleCreateNewItem(value)
      .then((newItem) => {
        !selectedItems.some(m => m.name === value) &&
          setSelectedItems(oldItems => [...oldItems, newItem])
      })
  }

  const isAnyItemsSelectedInside = () => !isItemsOutside && selectedItems.length > 0

  const getClassesForTriggerButton = () =>
    isAnyItemsSelectedInside()
      ? ['primary']
      : []

  return (
    <React.Fragment>

      <div className='select-container'>
        <div
          className='container'
          ref={containerRef}
        >
          <Button
            label={label}
            onClick={showPopUp}
            classes={getClassesForTriggerButton()}
            ref={buttonRef}
          ></Button>

          {isPopUpVisible &&
            <PopUp
              onItemSelected={handleItemSelected}
              onItemClicked={handleItemClicked}
              onAllItemsUnselected={handleAllItemsUnselected}
              onAllItemsSelected={handleAllItemsSelected}
              items={getUnselectedItems()}
              selectedItems={selectedItems}
              sortBy={sortBy}
              hasSearch={hasSearch}
              hasClear={hasClear}
              isItemsOutside={isItemsOutside}
              onCreateNewItem={handleCreateNewItem}
              parentContainerRef={parentContainerRef}
              triggerRef={buttonRef}
            ></PopUp>
          }

        </div>

        {isItemsOutside && (
          <React.Fragment>
            <SelectedItems
              onItemUnselected={handleItemUnselected}
              onUnselectedAllItems={handleAllItemsUnselected}
              items={selectedItems}
            ></SelectedItems>
          </React.Fragment>
        )}
      </div>

    </React.Fragment>
  )
}