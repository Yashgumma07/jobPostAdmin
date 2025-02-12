import React from 'react'
import welcome from '../images/login/welcome.png'
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="flex justify-center loginBg min-h-screen">
      <div className="flex flex-col justify-center my-4">
        <div className="flex justify-center">
          <img src={welcome} alt="welcome image" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mx-5 my-5"><h2 className="text-blue-700 text-2xl font-bold">Discover your Dream Job here</h2></div>
          <div className="px-10"><p>Explore all the existing job roles based on your interest and study major</p></div>
        </div>
        <div className="my-10 flex justify-center">
          <Link to="/login">
            <button className="bg-blue-700 hover:bg-blue-600 px-3 py-3 mx-2 rounded-md text-white font-bold text-xl w-[120px] shadow-lg shadow-blue-200">Login</button>
          </Link>
          <Link to="/register">
            <button to="/register" className="px-3 py-3 mx-2 text-blue-800 hover:bg-blue-200 rounded-md text-xl font-bold w-[120px]">Register</button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Welcome
