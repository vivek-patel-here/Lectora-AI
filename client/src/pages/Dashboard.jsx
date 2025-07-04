import Header from '../components/Header'

function Dashboard() {
  return (
    <div className='min-h-screen w-screen flex'>
        <div className='w-full md:w-full  h-screen   '>
          <Header heading={"Dashboard"}/>
          <p className='p-4 text-[#102020ab] text-lg'>Welcome back! Here's an overview of what has been accomplished so far.</p>
        </div>
    </div>
  )
}

export default Dashboard