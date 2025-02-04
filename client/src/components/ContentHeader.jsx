import React from 'react'

function ContentHeader() {
  return (
    <div className='content--header'>
      <h1 className="header--title">Dashboard</h1>
      <div className="header--activity">
        <div className="search-box">
            <input type='text' placeholder='Search anything...' />
            <i className='fa fa-user icon'>o</i>
        </div>
        <div className="notify">
            <i className='fa fa-user icon'>o</i>
        </div>
      </div> 
    </div>
  )
}

export default ContentHeader
