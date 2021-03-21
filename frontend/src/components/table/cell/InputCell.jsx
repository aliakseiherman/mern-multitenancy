import React from 'react'
import { getCellValue, updateCellValue } from '../helper'

export const InputCell = (props) => {

  const {
    data,
    column,
    updateRow
  } = props

  const {
    style,
    onChange: handleChange
  } = column

  let value = getCellValue(data, column)

  return (
    <div
      className='cell'
      style={style}
    >
      <input className='in-cell-input' type='text' value={value} onChange={function (e) {
        updateCellValue(e.target.value, data, column)
        updateRow(data)
        handleChange(data)
      }} />
    </div>
  )
}