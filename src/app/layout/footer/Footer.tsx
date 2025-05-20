import React from 'react'
import './footer.css'

function Footer() {
  return (
    <div className='footer fixed-bottom bg-white text-center d-none d-sm-block ' >
      <div className='d-flex justify-content-between'>
        <div className='ms-4 text-xs'>
          <p > Version 0.4.2 </p> 
        </div>
  
        <div className='text-xs me-3'>
          <p>
            All rights reserved | T&C | Privacy Policy | 
            <span style={{ color: '#59b039' }}> DEVELOPED BY SOFT-TECH SOLUTION © 2014 - 2024</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
