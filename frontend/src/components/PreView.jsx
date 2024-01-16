import React from 'react'

import "../styles/global.css";
import { IoCloseSharp } from "react-icons/io5";


function PreView({ img, btn }) {
  return (
    <div className='container position-over-view'>


      <img src={img} alt="" />
      <span onClick={btn}><IoCloseSharp /></span>



    </div>
  )
}

export default PreView