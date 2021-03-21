import React from 'react'
import { getClassName } from '../../helpers/css-class-helper'
import { Cell } from './Cell'
import { preProcessColumns } from './helper'

export const Row = (props) => {

  const {
    columns,
    row,
    data,
    updateRow,
    settings,
    dataRowsContainerRef
  } = props

  const finalRowClass = getClassName(settings.cssClasses.concat('row'))

  preProcessColumns(row, columns)

  return (
    <div className={finalRowClass}>
      {columns.map((column, i) => (
        <Cell
          data={data}
          column={column}
          updateRow={updateRow}
          dataRowsContainerRef={dataRowsContainerRef}
          key={i}
        ></Cell>
      ))}
    </div>
  )
}
