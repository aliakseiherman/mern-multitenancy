import React, { useState, useEffect } from 'react'
import store from './store'
import { EVENT_HEADER_CELL_CLICKED, SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DESCENDING } from './constants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'

export const HeaderCell = (props) => {

  const {
    column,
    defaultSortColumnName,
    defaultSortDirection
  } = props

  const {
    style,
    name: columnName,
    objectProperty,
    isSortable
  } = column

  const [orderDirection, setOrderDirection] = useState(null)

  useEffect(() => {
    if (objectProperty === defaultSortColumnName) {
      if (defaultSortDirection === SORT_DIRECTION_ASCENDING) {
        setOrderDirection(SORT_DIRECTION_ASCENDING)
      } else {
        setOrderDirection(SORT_DIRECTION_DESCENDING)
      }
    }

    const unsubscribe = store.subscribe(() => {
      let bus = store.getState().bus

      if (bus.type === EVENT_HEADER_CELL_CLICKED) {
        if (bus.tableGuid === props.tableGuid && bus.columnName !== objectProperty) {
          setOrderDirection(null)
        }
      }
    })

    return () => {
      unsubscribe()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSort = () => {

    let value = SORT_DIRECTION_ASCENDING

    if (orderDirection === SORT_DIRECTION_ASCENDING) {
      value = SORT_DIRECTION_DESCENDING
    }

    setOrderDirection(value)

    store.dispatch({ type: EVENT_HEADER_CELL_CLICKED, tableGuid: props.tableGuid, columnName: objectProperty, orderDirection: value })
  }

  let arrowSymbol = ''

  if (orderDirection === SORT_DIRECTION_ASCENDING) {
    arrowSymbol = <FontAwesomeIcon icon={faLongArrowAltUp} />
  }
  if (orderDirection === SORT_DIRECTION_DESCENDING) {
    arrowSymbol = <FontAwesomeIcon icon={faLongArrowAltDown} />
  }

  return (
    <React.Fragment>
      {isSortable ?
        (
          <div
            className='header-cell cursor-pointer'
            style={style}
            onClick={handleSort}
          >
            <span>{arrowSymbol}</span>
            <span>{columnName}</span>
          </div>
        ) : (
          <div
            className='header-cell'
            style={style}
          >
            <span>{columnName}</span>
          </div>
        )}

    </React.Fragment>
  )
}