import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../button/Button'
import { PopUp } from './PopUp'
import '../../assets/styles/feasible-ui.css'

export const Select = (props) => {

  const {
    parentContainerRef,
    sortBy,
    hasSearch,
    hasClear,
    label,
    selectedItem,
    setSelectedItem
  } = props

  const [isPopUpVisible, setIsPopUpVisible] = useState(false)

  const showPopUp = () => {
    setIsPopUpVisible(true)
  }

  const handleItemSelected = (item) => {
    setSelectedItem(item)
  }

  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(props.items)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.items])

  const containerRef = useRef(null)
  const buttonRef = useRef(null)

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

  const getClassesForTriggerButton = () =>
    selectedItem
      ? ['primary']
      : []

  const getButtonLabel = () => selectedItem ? selectedItem.name : label

  const close = () => { setIsPopUpVisible(false) }

  return (
    <React.Fragment>

      <div className='select-container'>
        <div
          className='container'
          ref={containerRef}
        >
          <Button
            label={getButtonLabel()}
            onClick={showPopUp}
            classes={getClassesForTriggerButton()}
            ref={buttonRef}
          ></Button>

          {isPopUpVisible &&
            <PopUp
              onItemSelected={handleItemSelected}
              items={items}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              close={close}
              sortBy={sortBy}
              hasSearch={hasSearch}
              hasClear={hasClear}
              parentContainerRef={parentContainerRef}
              triggerRef={buttonRef}
            ></PopUp>
          }

        </div>
      </div>

    </React.Fragment>
  )
}