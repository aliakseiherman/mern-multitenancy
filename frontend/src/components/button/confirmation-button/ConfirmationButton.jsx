import React, { useEffect, useRef, useState } from 'react'
import { PopUp } from './PopUp'
import { Button } from '../Button'
import '../../../assets/styles/feasible-ui.css'

export const ConfirmationButton = (props) => {

  const {
    label,
    innerMarkup,
    classes,
    isDisabled,
    onConfirm: handleConfirm,
    parentContainerRef,
  } = props

  const [isCofirmationVisible, setIsCofirmationVisible] = useState(false)

  const containerRef = useRef(null)
  const buttonRef = useRef(null)

  const onClick = () => {
    !isDisabled &&
      setIsCofirmationVisible(true)
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
    <div
      className='container'
      ref={containerRef}
    >
      <Button
        label={label}
        innerMarkup={innerMarkup}
        classes={classes}
        isDisabled={isDisabled}
        onClick={onClick}
        ref={buttonRef}
      ></Button>

      {isCofirmationVisible &&
        <PopUp
          parentContainerRef={parentContainerRef}
          triggerRef={buttonRef}
          setIsCofirmationVisible={setIsCofirmationVisible}
          onConfirm={handleConfirm}
        ></PopUp>
      }
    </div >
  )
}