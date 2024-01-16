import React from 'react'

import "../styles/global.css";

function Menu({ children }) {
  return (
    <div className='btn-menu'>
      {children}
    </div>
  )
}

export default Menu