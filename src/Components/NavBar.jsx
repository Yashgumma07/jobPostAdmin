import React, { useState } from 'react'
import JobPopUp from './JobPopUp';
import logo from "../images/navBar/logo.png";
import Jobs from './Jobs';
import Applied from './Applied';
import Shortlisted from './Shortlisted';
import Profile from './Profile';



function NavBar() {
  const [popup, setPopup] = useState(false);
  const [home,setHome] = useState(true);
  const [applied, setApplied] = useState(false);
  const [short, setShort] = useState(false);
  const [profile, setProfile] = useState(false);

  const [applicationId, setApplicationId] = useState();

  return (
    <div className="overflow-hidden">
      <div className='flex justify-around p-3'>
        <div className="p-3">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex justify-between w-[400px] p-0">
          <div className={home?"listClick":"list"} 
          onClick={() => { setHome(true), setApplied(false), setShort(false), setProfile(false) }} >Home</div>
          <div className={applied ? "listClick" : "list"} 
            onClick={() => { setHome(false), setApplied(true), setShort(false), setProfile(false) }} >Applied</div>
          <div className={short ? "listClick" : "list"} 
            onClick={() => { setHome(false), setApplied(false), setShort(true), setProfile(false) }} >Shortlisted</div>
          <div className={profile ? "listClick" : "list"}
            onClick={() => { setHome(false), setApplied(false), setShort(false), setProfile(true) }} >Profile</div>
        </div>
        <div>
          <button className="contactBtn">contact us</button>
        </div>

      </div>
      <div>{home && <Jobs popup={popup} setPopup={setPopup} setApplicationId={setApplicationId} />}</div>
      <div>{applied && <Applied />}</div>
      <div>{short && <Shortlisted />}</div>
      <div>{profile && <Profile />}</div>
      <div>{popup && <JobPopUp setPopup={setPopup} applicationId={applicationId} />}</div>
    </div>
  )
}

export default NavBar
