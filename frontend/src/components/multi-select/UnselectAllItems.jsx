import React from 'react'

export const UnselectAllItems = (props) => {

  const {
    onClick: handleClick
  } = props

  return (
    <div
      className='selected-item unselect-all-items'
      onClick={handleClick}
    >
      <span className='text'>clear</span>
    </div>
  )
}