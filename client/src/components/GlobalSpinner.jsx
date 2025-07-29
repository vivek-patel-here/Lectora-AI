import React from 'react'

function GlobalSpinner() {
  return (
    <div className='min-h-full bg-[#000000f1] grid place-content-center w-screen absolute  left-0 z-50'>
        <span id="global-spinner-loader"></span>
    </div>
  )
}

export default GlobalSpinner