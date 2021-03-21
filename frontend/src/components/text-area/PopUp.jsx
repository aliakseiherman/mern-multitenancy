import React, { useEffect, useState } from 'react'
import { Button } from '../button/Button'
import { getPopupStyle } from '../../helpers/position-helper'

export const PopUp = (props) => {

  const {
    parentContainerRef,
    triggerRef,
    onSave: handleSave
  } = props

  const [style, setStyle] = useState({})

  useEffect(() => {
    let _style = getPopupStyle(parentContainerRef, triggerRef, {
      pxReservedAbove: 21,
      anchor: {
        x: 'r'
      }
    })
    setStyle(_style)
  }, [parentContainerRef, triggerRef])

  return (
    <div className='popup' style={style}>
      <Button
        onClick={handleSave}
        label={'save'}
        classes={['primary']}
      ></Button>
    </div>
  )
}