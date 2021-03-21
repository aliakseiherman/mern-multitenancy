import React from 'react'

export const SelectedItem = (props) => {

  const {
    item,
    onItemUnselected: handleItemUnselected
  } = props

  const onDeleteClick = () => {
    handleItemUnselected(item)
  }

  return (
    <div
      className='selected-item'
      onClick={onDeleteClick}
    >
      <span className='text'>{item.name}</span>
    </div>
  )
}