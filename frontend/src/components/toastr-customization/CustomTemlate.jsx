import React, { useState } from 'react'
import { Button } from '../button/Button'

export const CustomTemplate = (props) => {

  const {
    descriptor,
    close
  } = props

  const {
    func
  } = descriptor

  const [view, setView] = useState('message')

  return (
    <div
      className='toast custom'
    >
      {view === 'message' &&
        <>
          <div className='toast-heading'><span style={{ color: 'rgb(138 206 255)' }}>from</span> John Doe</div>
          <div className='toast-text'>hi there, we need your immediate help with #0982</div>
          <div className='label'>attachments:</div>
          <div className='attachments'>
            <span>calcs-2020-11.xls</span>
            <span>img1.png</span>
            <span>screencast.mp4</span>
          </div>
          <div className='buttons'>
            <Button
              label={'quick reply'}
              onClick={() => { setView('reply') }}
            ></Button>
            <Button
              label={'view'}
              onClick={() => { }}
            ></Button>
            <Button
              label={'dismiss'}
              onClick={close}
            ></Button>
          </div>
        </>
      }
      {view === 'reply' &&
        <>
          <textarea className='text-area reply' placeholder='type your reply...'></textarea>

          <div className='buttons'>
            <Button
              label={'send'}
              onClick={close}
            ></Button>
            <Button
              label={'cancel'}
              onClick={close}
            ></Button>
          </div>
        </>
      }
    </div>
  )
}