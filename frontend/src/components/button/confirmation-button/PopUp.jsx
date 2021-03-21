import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import { getPopupStyle } from '../../../helpers/position-helper'

export const PopUp = (props) => {

  const {
    parentContainerRef,
    triggerRef,
    onConfirm: handleConfirm,
    setIsCofirmationVisible
  } = props

  const [style, setStyle] = useState({})

  useEffect(() => {
    let _style = getPopupStyle(parentContainerRef, triggerRef, { pxReservedAbove: 21 })
    setStyle(_style)
  }, [parentContainerRef, triggerRef])

  return (
    <div className='popup' style={style}>

      <Button
        onClick={() => {
          handleConfirm()
          setIsCofirmationVisible(false)
        }}
        label={'confirm'}
        classes={['primary']}
      ></Button>

      <Button
        onClick={() => {
          setIsCofirmationVisible(false)
        }}
        label={'cancel'}
        classes={['secondary']}
      ></Button>

    </div>
  )
}