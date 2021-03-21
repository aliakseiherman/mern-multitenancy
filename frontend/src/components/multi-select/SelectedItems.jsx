import React from 'react'
import { SelectedItem } from './SelectedItem'
import { UnselectAllItems } from './UnselectAllItems'

export const SelectedItems = (props) => {

  const {
    items,
    onItemUnselected: handleItemUnselected,
    onUnselectedAllItems: handleUnselectedAllItems
  } = props

  return (
    <div className='selected-items-container'>
      {items.map((item, i) => (
        <SelectedItem
          onItemUnselected={handleItemUnselected}
          item={item}
          key={i}
        ></SelectedItem>
      ))}
      {items && items.length > 1 && (
        <UnselectAllItems
          onClick={handleUnselectedAllItems}
        />
      )}
    </div>
  )
}