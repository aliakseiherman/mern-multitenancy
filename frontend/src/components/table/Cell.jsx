import React from 'react'
import { PlainTextCell } from './cell/PlainTextCell'

export const Cell = (props) => {

  const {
    column,
    data,
    updateRow,
    dataRowsContainerRef
  } = props

  if (column.template) {
    const Cell = column.template
    return (
      <Cell
        data={data}
        column={column}
        updateRow={updateRow}
        dataRowsContainerRef={dataRowsContainerRef}
      ></Cell>
    )
  } else {
    return (
      <PlainTextCell
        data={data}
        column={column}
        dataRowsContainerRef={dataRowsContainerRef}
      ></PlainTextCell>
    )
  }
}