import HomePageNav from '@/components/HomePageNav'
import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeHouseHolder from './HomeHouseHolder'

function RootHouseHolder() {
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <HomePageNav />
      <Outlet />
    </div>
  )
}

export default RootHouseHolder
