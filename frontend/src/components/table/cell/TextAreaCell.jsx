import React from 'react'
import { TextArea } from '../../text-area/TextArea'
import { getCellValue, updateCellValue } from '../helper'

export const TextAreaCell = (props) => {

  const {
    data,
    column,
    updateRow,
    dataRowsContainerRef
  } = props

  const {
    style,
    onChange: handleChange
  } = column

  const value = getCellValue(data, column)

  return (
    <div
      className='cell'
      style={style}
    >
      <TextArea
        value={value}
        onChange={(value) => {
          updateCellValue(value, data, column)
          updateRow(data)
          handleChange(data)
        }}
        isFullWidth={true}
        customClasses={['in-table-text-area']}
        parentContainerRef={dataRowsContainerRef}
      ></TextArea>
    </div>
  )
}
