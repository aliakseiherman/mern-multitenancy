import React from 'react'
import { getClassName } from '../../helpers/css-class-helper'
import '../../assets/styles/feasible-ui.css'

export const Button = React.forwardRef((props, ref) => {

  const {
    onClick: _handleClick,
    label,
    innerMarkup,
    isDisabled,
    classes: _classes
  } = props

  let classes = ['button']
  isDisabled && classes.push('disabled')
  classes = classes.concat(_classes)

  const handleClick = () => {
    !isDisabled && _handleClick()
  }

  return (
    <div
      className={getClassName(classes)}
      onClick={handleClick}
      ref={ref}
    >
      {innerMarkup &&
        (innerMarkup)
      }
      {!innerMarkup && (
        <span>{label}</span>
      )}
    </div>
  )
})