import React from 'react'
import NavBar from './NavBar'
import Jobs from './Jobs'

function Home() {
  const value = false;
  return (
    <div className="max-h-full overflow-hidden">
      <div><NavBar /></div>
      <div><Jobs /></div>
    </div>
  )
}

export default Home
