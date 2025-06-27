import React from 'react'
import OtpInput from "react-otp-input";
import { TfiClose } from "react-icons/tfi";


function OtpModal({handleSubmit,otp,setOtp,setShowModal}) {
  return (
    <div className=" h-screen w-screen absolute bg-[#000000be] grid place-items-center">
          <TfiClose
            className="absolute top-10 right-10 cursor-pointer"
            onClick={() => setShowModal(false)}
          />
          <form
            onSubmit={handleSubmit}
            className="bg-transparent  rounded-2xl h-1/2 w-full grid place-items-center"
          >
            <h1 className="text-2xl">Enter OTP below</h1>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              isInputNum
              shouldAutoFocus
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle="w-14 h-12 border border-gray-500 rounded-sm mx-1 text-center text-xl focus:outline-none "
              containerStyle="flex justify-between  lg:w-1/4 w-1/2 items-center h-1/8 "
            />

            <button
              className="bg-violet-500 text-white px-5 py-2 rounded-sm"
            >
              Submit &rarr;
            </button>
            <p>*Please check your Spam folder. If found there, click 'Not Spam' to receive future OTPs directly in Inbox.</p>
          </form>
        </div>
  )
}

export default OtpModal