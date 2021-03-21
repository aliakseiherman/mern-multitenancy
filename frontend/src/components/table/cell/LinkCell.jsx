import React from 'react'
import { useHistory } from 'react-router-dom'
import { getCellValue } from '../helper'

export const LinkCell = (props) => {

  const {
    data,
    column
  } = props

  const style = column.style

  let value = getCellValue(data, column)

  let isTextAvailable = text && text.length > 0

  const history = useHistory()

  function onClick() {
    history.push(column.link.get(data))
  }

  return (
    <div
      className='cell link-cell non-selectable'
      style={style}
      onClick={onClick}
    >
      {
        isTextAvailable ?
          (
            <span>{value}</span>
          ) : (
            <span className='not-available'>{'n/a'}</span>
          )
      }
    </div >
  )
}