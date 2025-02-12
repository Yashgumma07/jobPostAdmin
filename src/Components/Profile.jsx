import React,{useState,useEffect} from 'react'
import profile from '../images/profile/profilePic.png';
import { getEmailId,getTotalJobs, getTotalAppliedJobs, getTotalShortlistedJobs } from '../store/userStore';
import CountUp from 'react-countup';

function Profile() {

  return (
    <div className="overflow-hidden">
      <div className="flex mx-[0%] mt-[10px] justify-center">
        <div className="flex flex-col items-center w-[80%] bg-[#F7F7F7] justify-around p-5">
          <div><img className="w-[200px] m-5 rounded-full" src={profile} alt="profile" /></div>
          <div className="font-bold text-xl">My Profile</div>
          <div className="font-bold text-xl">{getEmailId()}</div>
          <div className="flex justify-between flex-wrap m-5">
            <div className="flex flex-col items-center justify-around w-[300px] h-[100px] text-white bg-gradient-to-r from-pink-500 to-violet-500 border-[5px] border-solid border-[#6300B3] rounded-lg m-[20px]">
              <div className="text-3xl font-bold"><CountUp start={0} end={getTotalJobs() || 0}></CountUp>+</div>
              <div className="text-xl font-bold">Total Available Job Posts</div>
            </div>
            <div className="flex flex-col items-center justify-around w-[300px] h-[100px] text-white border-[#6300B3] border-[5px] border-solid bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg m-[20px]">
              <div className="text-3xl font-bold"><CountUp start={0} end={getTotalAppliedJobs() || 0}></CountUp>+</div>
              <div className="text-xl font-bold">Total Applied Job Posts</div>
            </div>
            <div className="flex flex-col items-center justify-around w-[300px] h-[100px] text-white bg-gradient-to-r from-purple-500 to-pink-500 border-[5px] border-solid border-[#6300B3] rounded-lg m-[20px]">
              <div className="text-3xl font-bold"><CountUp start={0} end={getTotalShortlistedJobs() || 0}></CountUp>+</div>
              <div className="text-xl font-bold">Total Shortlisted Job Posts</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile
