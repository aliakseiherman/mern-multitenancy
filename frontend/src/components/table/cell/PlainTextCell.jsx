import React from 'react'
import { getCellValue } from '../helper'

export const PlainTextCell = (props) => {

  const {
    data,
    column
  } = props

  const style = column.style

  let value = getCellValue(data, column)

  let isTextAvailable = value && value.length > 0

  let className = ''

  if (!column.textSelectable) {
    className = 'non-selectable'
  }

  return (
    <div
      className='cell'
      style={style}
    >
      {
        isTextAvailable ?
          (
            <span className={className}>{value}</span>
          ) : (
            <span className={className + ' ' + 'not-available'}>{'n/a'}</span>
          )
      }
    </div>
  )
}