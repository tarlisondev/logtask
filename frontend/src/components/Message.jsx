
import React from 'react'

import "../styles/global.css";

function Message({ msg, btn }) {
  return (
    <div className='container message-view'>
      <div>

        <div>{msg}</div>
        <span onClick={btn}>X</span>

      </div>

    </div>
  )
}

export default Message