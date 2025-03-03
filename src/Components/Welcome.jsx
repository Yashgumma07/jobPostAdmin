import React from 'react'
import welcome from '../images/login/welcomePicture.png'
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="flex justify-center loginBg min-h-screen">
      <div className="flex flex-col justify-center my-4">
        <div className="flex justify-center">
          <img src={welcome} alt="welcome image" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mx-5 my-5"><h2 className="text-blue-700 text-2xl font-bold">Find the Right Talent, Faster!</h2></div>
          <div className="px-10"><p>Post job openings effortlessly and connect with top candidates in no time. Streamline your hiring process with ease!</p></div>
        </div>
        <div className="my-10 flex justify-center">
          <Link to="/main">
            <button className="bg-blue-700 hover:bg-blue-600 px-3 py-3 mx-2 rounded-md text-white font-bold text-xl w-[250px] shadow-lg shadow-blue-200">Click Here To Explore</button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Welcome
