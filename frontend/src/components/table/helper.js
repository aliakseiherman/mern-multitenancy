import { getString } from '../../helpers/string-helper'
import { isOdd } from './../../helpers/math-helper'

export const getRowSettings = (row, sequence) => {

  let cssClass = isOdd(sequence) ? 'row-odd' : 'row-even'

  return {
    cssClasses: [cssClass]
  }
}

export const getRowClass = (settings, initialClass) => {

  let cssClasses = settings.cssClasses

  let finalCssClass = initialClass

  if (cssClasses.length > 0) {
    finalCssClass += ' ' + cssClasses.join(' ')
  }

  return finalCssClass
}

export const preProcessColumns = (row, columns) => {
  if (row && row.cell) {
    columns.forEach(function (column) {
      column.template = row.cell.template
      column.link = row.cell.link
    })
  }
}

export const getCellValue = (data, column) => {
  let value = column.getValue
    ? column.getValue(data, column)
    : data[column.objectProperty]
  value = getString(value)

  return value
}

export const updateCellValue = (newValue, data, column) => {

  const handleChangeCellValue = column.onChangeCellValue

  if (handleChangeCellValue) {
    handleChangeCellValue(newValue, data, column)
  } else {
    data[column.objectProperty] = newValue
  }
}