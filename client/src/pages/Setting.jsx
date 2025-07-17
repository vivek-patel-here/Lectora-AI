import React from 'react'
import Header from '../components/Header'
import ProfileSetting from '../components/ProfileSetting'

function Setting() {
  return (
    <div className={'w-screen h-fit'}>
        <Header heading={"Setting"} />
        <p className="pl-2 py-4 w-19/20 text-[#010102c9] text-md">
        Manage your account preferences and settings
      </p>
      <ProfileSetting/>
      
    </div>
  )
}

export default Setting