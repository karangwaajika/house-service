import React from 'react'


function Sidebar() {
  return (
    <div className='meu'>
      <div className='logo'>
        <i className='fa fa-user logo-icon'></i>
        <h2>EduFlex</h2>
      </div>
      <div className='menu--list'>
        <a href="#" className='item'>
            <i className='fa fa-user icon'>o</i>
            Dashboard
        </a>
        <a href="#" className='item'>
            <i className='fa fa-user icon'>o</i>
            Assignment
        </a>
        <a href="#" className='item'>
            <i className='fa fa-user icon'>o</i>
            Report
        </a>
        <a href="#" className='item'>
            <i className='fa fa-user icon'>o</i>
            Stats
        </a>
        <a href="#" className='item'>
            <i className='fa fa-user icon'>o</i>
            Message
        </a>
        <a href="#" className='item'>
            <i className='fa fa-user icon'>o</i>
            Help
        </a>
      </div>
    </div>
  )
}

export default Sidebar
