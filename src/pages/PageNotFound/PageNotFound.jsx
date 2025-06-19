import React from 'react'
import './PageNotFound.css'
import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
    const navigate = useNavigate();
  return (
    <div className='page-not-found-div'>
        <div className='page-not-found-img-div'>
            <img src="/error-image.svg" alt="" />
        </div>
        <h1>404 Not Found</h1>
        <p>We couldn't find what you were looking for!</p>
        <button 
            className="btn btn-outline"
            onClick={()=>navigate('/')}
        >Return Home</button>
    </div>
  )
}
