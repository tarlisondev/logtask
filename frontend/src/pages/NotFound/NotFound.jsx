import React from 'react'
import { Link } from 'react-router-dom';
import Back from "../../components/Back"
import "../../styles/global.css";

function NotFound() {
  return (
    <div className='container'>
      <Link to="/">  <Back /> </Link>
      <h1 className='not-found-page-title'>Error</h1>
      <h2 className='not-found-page-text'>Not found page! :( </h2>
    </div>
  )
}

export default NotFound