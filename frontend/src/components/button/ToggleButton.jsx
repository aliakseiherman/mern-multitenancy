import React, { useEffect, useState } from 'react'
import '../../assets/styles/feasible-ui.css'

export const ToggleButton = (props) => {

  const {
    onChange: handleChange,
    tooltip: _tooltip
  } = props

  const [isOn, setIsOn] = useState(false)

  const tooltip = _tooltip ? _tooltip : ''

  let classes = ['toggle']
  isOn && classes.push('toggle-enabled')
  let className = classes.join(' ')

  useEffect(() => {
    setIsOn(props.isOn)
  }, [props.isOn])

  const handleClick = () => {
    handleChange()
  }

  return (
    <div
      className={className}
      onClick={handleClick}
      title={tooltip}
    >
      {isOn &&
        <span>on</span>
      }
      {!isOn &&
        <span>off</span>
      }
    </div>
  )
}