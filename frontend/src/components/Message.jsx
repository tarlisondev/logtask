
import React from 'react'

import "../styles/global.css";

function Message({ msg, btn }) {
  return (
    <div className='container message-view'>
      <div>

        <div>{msg}</div>

      </div>

      <span onClick={btn}>X</span>

    </div>
  )
}

export default Message