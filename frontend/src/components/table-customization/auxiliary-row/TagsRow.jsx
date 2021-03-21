import React, { useEffect, useState } from 'react'
import { getClassName } from '../../../helpers/css-class-helper'
import { OBJECT_PROPERTY_ABOUT, OBJECT_PROPERTY_NAME } from '../../table/constants'
import { Tags } from '../../tags/Tags'

const Cell = (props) => {

  const {
    column,
    data,
    updateRow,
    descriptor,
    dataRowsContainerRef
  } = props

  const {
    getTags,
    onTagAdded: _handleTagAdded,
    onTagRemoved: _handleTagRemoved
  } = descriptor

  const style = column.style

  const handleTagAdded = (tag) => {
    _handleTagAdded(data, tag).then(() => {
      updateRow(data)
    })
  }

  const handleTagRemoved = (tag) => {
    _handleTagRemoved(data, tag).then(() => {
      updateRow(data)
    })
  }

  return (
    <div
      className='cell'
      style={style}
    >
      {column.objectProperty === OBJECT_PROPERTY_ABOUT &&
        <Tags
          selectedTags={data.carTypes}
          getTags={getTags}
          onTagAdded={handleTagAdded}
          onTagRemoved={handleTagRemoved}
          parentContainerRef={dataRowsContainerRef}
        ></Tags>
      }
    </div>
  )
}

export const TagsRow = (props) => {

  const {
    data,
    columns,
    auxiliaryRow,
    updateRow,
    descriptor,
    dataRowsContainerRef,
    settings
  } = props

  const finalRowClass = getClassName(settings.cssClasses.concat('auxilliary-row'))

  useEffect(() => {

  }, [props.data])

  return (
    <div className={finalRowClass}>
      {columns.map((column, i) => (
        <Cell
          column={column}
          auxiliaryRow={auxiliaryRow}
          descriptor={descriptor}
          data={data}
          updateRow={updateRow}
          dataRowsContainerRef={dataRowsContainerRef}
          key={i}
        ></Cell>
      ))}
    </div>
  )
}