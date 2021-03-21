import React, { useEffect, useState } from 'react'
import { getPopupStyle } from '../../helpers/position-helper'
import { Button } from '../button/Button'

export const PopUp = (props) => {

  const {
    parentContainerRef,
    triggerRef,
    buttons
  } = props

  const [style, setStyle] = useState({})

  useEffect(() => {
    let _style = getPopupStyle(parentContainerRef, triggerRef, {
      pxReservedAbove: 30,
      anchor: {
        x: 'r'
      }
    })
    setStyle(_style)
  }, [parentContainerRef, triggerRef])

  return (
    <div className='popup' style={style}>
      {buttons.map((button, i) => (
        <Button
          onClick={() => {
            button.onClick()
          }}
          label={button.label}
          classes={button.classes}
          key={i}
        ></Button>
      ))}
    </div>
  )
}