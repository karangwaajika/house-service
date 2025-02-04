import React from 'react'
import HomePageNav from '../components/HomePageNav'
import HomeText from '../components/HomeText'
import ServiceCategory from '../components/ServiceCategory'

function Home() {
  return (
    <div className='app-container'>
        <div className='intro'>
            <div className='mask'>
                <HomePageNav />
                <HomeText />
            </div>
        </div>
        <ServiceCategory />
    </div>
  )
}

export default Home
