import React from 'react'
import HomePageNav from '../components/HomePageNav'
import LoginForm from '../components/LoginForm'

function Login() {
  return (
    <div className='app-container'>
        <div className='intro'>
            <div className='mask--login'>
              <HomePageNav />
              <LoginForm />
            </div>
        </div>
    </div>
  )
}

export default Login
