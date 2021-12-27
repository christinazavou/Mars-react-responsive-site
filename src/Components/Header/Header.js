import React, { useState, useEffect } from 'react'
import TopNav from './TopNav/TopNav'

function Header(props) {
  return (
    <div className="container">
      <header >
      <div className="gradient_container_top"></div>
      <div className="gradient_container_bottom"></div>
       <TopNav {...props} />
      </header>

  </div>
  )
}

export default Header