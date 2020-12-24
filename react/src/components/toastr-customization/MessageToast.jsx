import React, { useState } from 'react';
import { Button } from 'feasible-ui';

export const MessageToast = (props) => {

  const {
    descriptor,
    close
  } = props;

  const {
    func
  } = descriptor;

  const [view, setView] = useState('message');

  return (
    <div className='toast custom'>
      {view === 'message' &&
        <>
          <div className='toast-heading'><span style={{ color: 'rgb(138 206 255)' }}>from</span><span style={{ color: 'rgb(61 236 255)' }}> John Doe</span></div>
          <div className='toast-text'>hi there, we need your immediate help with #0982</div>
          <div className='label'>attachments:</div>
          <div className='attachments'>
            <div>calcs-2020-11.xls</div>
            <div>img1.png</div>
            <div>screencast.mp4</div>
          </div>
          <div className='buttons'>
            <Button
              label={'quick reply'}
              onClick={() => { setView('reply'); }}
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