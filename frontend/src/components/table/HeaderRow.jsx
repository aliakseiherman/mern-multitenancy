import React from 'react'
import { HeaderCell } from './HeaderCell'

export const HeaderRow = (props) => {

  const {
    columns,
    tableGuid,
    defaultSortColumnName,
    defaultSortDirection
  } = props

  return (
    <div className='header-row'>
      {columns && columns.map((column, i) => (
        <HeaderCell
          tableGuid={tableGuid}
          column={column}
          defaultSortColumnName={defaultSortColumnName}
          defaultSortDirection={defaultSortDirection}
          key={i}
        ></HeaderCell>
      ))}
    </div>
  )
}