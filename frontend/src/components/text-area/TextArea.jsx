import React, { useState, useEffect, useRef } from 'react'
import { PopUp } from './PopUp'

import '../../assets/styles/feasible-ui.css'

export const TextArea = React.forwardRef((props, ref) => {

  const {
    onChange: _handleChange,
    placeholder,
    parentContainerRef,
    isAutoFocus,
    isSaveOnEnter,
    isFullWidth,
    customClasses
  } = props

  const [isCofirmationVisible, setIsCofirmationVisible] = useState(false)
  const [value, setValue] = useState(props.value)

  const containerRef = useRef(null)
  const textAreaRef = useRef(null)

  const prevValueRef = useRef()

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      cancel()
    }
  }

  useEffect(() => {
    setValue(props.value)
    prevValueRef.current = props.value
  }, [props.value])

  const trySetFocus = () => {
    isAutoFocus && textAreaRef.current &&
      textAreaRef.current.focus()
  }

  useEffect(() => {
    trySetFocus()

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        cancel()
        break
      case 'Enter':
        isSaveOnEnter &&
          handleSave()
        break
      default:
        break
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const cancel = () => {
    setIsCofirmationVisible(false)
    setValue(prevValueRef.current)
  }

  const handleSave = () => {
    setIsCofirmationVisible(false)
    _handleChange(value)
    textAreaRef.current.blur()
  }

  const getContainerClass = () => {
    let classes = ['container']
    isFullWidth &&
      classes.push('full-width')

    return classes.join(' ')
  }

  const getTextAreaClass = () => {
    let classes = ['text-area']
    isFullWidth &&
      classes.push('full-width')

    if (customClasses) {
      classes = classes.concat(customClasses)
    }

    return classes.join(' ')
  }

  return (
    <div
      className={getContainerClass()}
      ref={containerRef}
    >
      <textarea
        value={value}
        onChange={(e) => {
          handleChange(e)
          setIsCofirmationVisible(true)
        }}
        onKeyDown={handleKeyDown}
        className={getTextAreaClass()}
        placeholder={placeholder}
        ref={textAreaRef}
      ></textarea>

      {isCofirmationVisible &&
        <PopUp
          parentContainerRef={parentContainerRef}
          triggerRef={textAreaRef}
          onSave={handleSave}
        ></PopUp>
      }

    </div>
  )
})