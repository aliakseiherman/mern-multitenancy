import React, { useState } from 'react'

import http from '../../helpers/axios-helper'
import { Link } from 'react-router-dom'
import { Toastr } from '../../components/toastr/Toastr'

export const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  const handleSubmit = (e) => {
    http
      .post('/login', {
        username: username,
        password: password,
        rememberMe: rememberMe
      })
      .then(function (result) {
        if (result.data.token) {
          localStorage.setItem('token', result.data.token)
          window.location = '/'
        }
      })
  }

  return (
    <>
      <div style={{ margin: '10px' }}>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', fontSize: '11px', color: 'green' }}>
          admin 123qwe
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '0 0 110px', marginRight: '5px', userSelect: 'none' }}>
            <span>username</span>
          </div>
          <div style={{ display: 'flex', flex: '1' }}>
            <input name='username' type='text' value={username} onChange={(e) => { setUsername(e.target.value) }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '0 0 110px', marginRight: '5px', userSelect: 'none' }}>
            <span>password</span>
          </div>
          <div style={{ display: 'flex', flex: '1' }}>
            <input name='password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '0 0 110px', marginRight: '5px', userSelect: 'none' }}>
            <span>remember me</span>
          </div>
          <div style={{ display: 'flex', flex: '1' }}>
            <input
              name='rememberMe'
              type='checkbox'
              checked={rememberMe}
              onChange={(e) => { setRememberMe(!rememberMe) }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '1', marginRight: '5px', userSelect: 'none' }}>
            <button onClick={handleSubmit}>sign in</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '1', marginRight: '5px', userSelect: 'none' }}>
            or&nbsp;<Link style={{ color: 'blue' }} to={`/register`}>register</Link>
          </div>
        </div>

      </div>

      <Toastr
        timeout={5000}
      ></Toastr>
    </>
  )
}