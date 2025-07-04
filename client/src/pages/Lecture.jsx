import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function Lecture() {
  return (
    <div className='min-h-screen w-screen flex'>
            <div className='w-full md:w-full  h-screen   '>
              <Header heading={"Your Lectures"}/>
              <h1 className=''>Lecture</h1>
            </div>
        </div>
  )
}

export default Lecture