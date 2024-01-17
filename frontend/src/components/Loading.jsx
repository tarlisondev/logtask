
import React from 'react'
import { LuLoader2 } from "react-icons/lu";
import "../styles/global.css";

function Loading() {
  return (
    <div className='container loading'>
      <LuLoader2 className='circle' />
      Loading...
    </div>
  )
}

export default Loading