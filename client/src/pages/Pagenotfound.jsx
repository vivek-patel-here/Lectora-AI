import React from 'react'
import { useNavigate } from 'react-router-dom'

function Pagenotfound() {
  const navigate = useNavigate()
    return (
    <div className='h-screen w-screen bg-black relative text-white'>
      <p className='w-full h-10 flex items-center justify-center text-5xl absolute top-4'> LegalEase</p>
      <h1 className='text-[250px] md:text-[400px] h-screen w-screen text-center font-sans'>404</h1>
      <div className='absolute  h-1/3 w-10/12 md:w-1/2 backdrop-blur-sm rounded-2xl z-10 border border-gray-400 top-1/4 md:top-1/2 left-1/2 -translate-x-1/2 grid place-items-center bg-[#000000ab]'>
        <h1 className='text-4xl text-center'>Oops, page not found</h1>
        <p className='text-gray-400 text-center'>The page you're looking for doesn't exist.It might have been moved or deleted.Let's get you back on track!</p>
        <button onClick={()=>{navigate('/')}} className='border px-10 py-1 rounded-sm '>&larr; Back</button>

      </div>

    </div>
  )
}

export default Pagenotfound