import React, { useEffect, useRef, useState } from 'react'
import { PopUp } from './PopUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export const Tag = (props) => {

  const {
    parentContainerRef,
    onItemUnselected: handleItemUnselected,
    isConfirmOnDelete,
    tag
  } = props

  const tagRef = useRef(null)
  const containerRef = useRef(null)

  const [isCofirmationVisible, setIsCofirmationVisible] = useState(false)

  function onDeleteClick() {
    if (isConfirmOnDelete) {
      setIsCofirmationVisible(true)
    } else {
      handleItemUnselected(tag)
    }
  }

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsCofirmationVisible(false)
    }
  }

  useEffect(() => {
    if (isCofirmationVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCofirmationVisible])

  return (
    <React.Fragment>

      <div
        className='container'
        ref={containerRef}
      >
        <div ref={tagRef} className='tag'>
          <span className='tag-name'>{tag.name}</span>
          <span className='delete-tag' onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </span>
        </div>

        {isCofirmationVisible &&
          <PopUp
            parentContainerRef={parentContainerRef}
            triggerRef={tagRef}
            buttons={[
              {
                label: 'yes',
                classes: ['primary'],
                onClick: function () {
                  setIsCofirmationVisible(false)
                  handleItemUnselected(tag)
                }
              }, {
                label: 'no',
                classes: ['secondary'],
                onClick: function () { setIsCofirmationVisible(false) }
              }
            ]}
          ></PopUp>
        }

      </div>

    </React.Fragment>
  )
}
