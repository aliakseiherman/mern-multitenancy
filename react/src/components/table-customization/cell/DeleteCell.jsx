import React from 'react';
import { ConfirmationButton } from 'feasible-ui';

export const DeleteCell = (props) => {

  const data = props.data;
  const column = props.column;
  const style = column.style;
  const parentContainerRef = props.dataRowsContainerRef;

  const handleDelete = column.onDelete;

  return (
    <div
      className='delete-cell'
      style={style}
    >
      <ConfirmationButton
        label={'delete'}
        classes={['primary']}
        onConfirm={() => { handleDelete(data); }}
        parentContainerRef={parentContainerRef}
      ></ConfirmationButton>
    </div>
  )
}