import React, { useState, useEffect, useRef } from 'react'
import { HeaderRow } from './HeaderRow'
import { Row } from './Row'
import { FooterRow } from './FooterRow'

import store from './store'
import { EVENT_HEADER_CELL_CLICKED, SORT_DIRECTION_ASCENDING, EVENT_SIZE_CHANGED, EVENT_PAGE_CHANGED } from './constants'
import { getRowSettings } from './helper'

import '../../assets/styles/feasible-ui.css'

export const Table = (props) => {

  const {
    guid,
    columns,
    defaultSortColumnName,
    defaultSortDirection,
    defaultSize,
    auxiliaryRows,
    footer,
    filterConfig,
    setFilterConfig,
    totalCount
  } = props

  const tableContainerRef = useRef(null)
  const dataRowsContainerRef = useRef(null)

  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(props.data)
  }, [props.data])

  const updateRow = (row) => {
    setRows(rows.map((r) => (r === row) ? row : r))
  }

  useEffect(() => {

    setFilterConfig({
      columnName: defaultSortColumnName,
      isAscending: defaultSortDirection === SORT_DIRECTION_ASCENDING,
      size: defaultSize,
      page: 1
    })

    const unsubscribe =
      store.subscribe(() => {

        let bus = store.getState().bus

        if (bus.type === EVENT_HEADER_CELL_CLICKED) {
          if (bus.tableGuid === guid && !!bus.columnName) {
            setFilterConfig((prevState) => {
              prevState.columnName = bus.columnName
              prevState.isAscending = bus.orderDirection === SORT_DIRECTION_ASCENDING
              return ({ ...prevState })
            })
          }
        }

        if (bus.type === EVENT_SIZE_CHANGED) {
          if (bus.tableGuid === guid && !!bus.size) {
            setFilterConfig((prevState) => {
              prevState.size = bus.size
              return ({ ...prevState })
            })
          }
        }

        if (bus.type === EVENT_PAGE_CHANGED) {
          if (bus.tableGuid === guid && !!bus.number) {
            setFilterConfig((prevState) => {
              prevState.page = bus.number
              return ({ ...prevState })
            })
          }
        }

      })

    return () => {
      unsubscribe()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className='table'
      ref={tableContainerRef}
    >
      <HeaderRow
        tableGuid={guid}
        columns={columns}
        defaultSortColumnName={defaultSortColumnName}
        defaultSortDirection={defaultSortDirection}
      ></HeaderRow>

      <div
        className='data-rows'
        ref={dataRowsContainerRef}
      >

        {rows && rows.map(function (data, i) {

          const settings = getRowSettings(data, i)

          return (
            <React.Fragment key={i}>

              <Row
                columns={columns}
                data={data}
                settings={settings}
                updateRow={updateRow}
                dataRowsContainerRef={dataRowsContainerRef}
                key={i}
              ></Row>

              {auxiliaryRows && auxiliaryRows.map(function (descriptor, i2) {

                const AuxilliaryRow = descriptor.component

                return (
                  <AuxilliaryRow
                    columns={columns}
                    data={data}
                    settings={settings}
                    descriptor={descriptor}
                    updateRow={updateRow}
                    dataRowsContainerRef={dataRowsContainerRef}
                    key={i2}
                  ></AuxilliaryRow>
                )
              })}

            </React.Fragment>
          )
        })}

        <div className='span-vertically'></div>

      </div>

      {filterConfig &&
        <FooterRow
          footer={footer}
          tableGuid={guid}
          size={filterConfig.size}
          totalCount={totalCount}
          tableContainerRef={tableContainerRef}
        ></FooterRow>
      }

    </div>
  )
}