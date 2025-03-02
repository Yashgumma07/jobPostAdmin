import React, { useState } from "react";
import JobPopUp from "./JobPopUp";
import logo from "../images/navBar/logo.png";
import Jobs from "./Jobs";
import Applied from "./Applied";
import Shortlisted from "./Shortlisted";
import Profile from "./Profile";
import { HiOutlineBars3 } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";
import Filters from './Filters';
import Applicants from "./Applicants";

function NavBar() {
  const [popup, setPopup] = useState(false);
  const [home, setHome] = useState(true);

  const [applicantsPopup, setApplicantsPopup] = useState(false);
  const [jobPostId, setJobPostId] = useState();

  return (
    <div className="overflow-hidden">
      {/* Navbar */}
      <div className="flex justify-between items-center p-0">
        <div className="p-3 mt-3">
          <img src={logo} alt="logo" />
        </div>
        {/*<div className="hidden md:flex justify-between w-[400px]">
           <div
            className={home ? "listClick" : "list"}
            onClick={() => {
              setHome(true);
              setApplied(false);
              setShort(false);
              setProfile(false);
            }}
          >
            Home
          </div>
          <div
            className={applied ? "listClick" : "list"}
            onClick={() => {
              setHome(false);
              setApplied(true);
              setShort(false);
              setProfile(false);
            }}
          >
            Applied
          </div>
          <div
            className={short ? "listClick" : "list"}
            onClick={() => {
              setHome(false);
              setApplied(false);
              setShort(true);
              setProfile(false);
            }}
          >
            Shortlisted
          </div>
          <div
            className={profile ? "listClick" : "list"}
            onClick={() => {
              setHome(false);
              setApplied(false);
              setShort(false);
              setProfile(true);
            }}
          >
            Profile
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)}>
            <HiOutlineBars3 className="text-3xl my-3 mx-2" />
          </button>
        </div> */}
        <div className="md:block">
          <div className="relative inline-block">
            <button
              className="mt-3 contactBtn px-4 py-2 mx-3 bg-blue-500 text-white rounded-md"
              onClick={() => setPopup(true)}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {/* <div
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <RxCrossCircled className="text-2xl" />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          {/* {home &&
          <button
            className="text-left mt-4 contactBtn"
            onClick={() => {
              setFilter(true);
              setMenuOpen(false);
            }}
          >
            Filters
          </button>} 
          <button
            className="text-left"
            onClick={() => {
              setHome(true);
              setApplied(false);
              setShort(false);
              setProfile(false);
              setMenuOpen(false);
            }}
          >
            Home
          </button>
          <button
            className="text-left"
            onClick={() => {
              setHome(false);
              setApplied(true);
              setShort(false);
              setProfile(false);
              setMenuOpen(false);
            }}
          >
            Applied
          </button>
          <button
            className="text-left"
            onClick={() => {
              setHome(false);
              setApplied(false);
              setShort(true);
              setProfile(false);
              setMenuOpen(false);
            }}
          >
            Shortlisted
          </button>
          <button
            className="text-left"
            onClick={() => {
              setHome(false);
              setApplied(false);
              setShort(false);
              setProfile(true);
              setMenuOpen(false);
            }}
          >
            Profile
          </button>
          <div className="relative inline-block">
            <button className="mt-4 contactBtn" onClick={() => setMenuOpen(false)}>
            Contact Us
          </button>
            <div className="absolute left-1/2 top-full mt-2 w-48 bg-white border border-gray-300 shadow-md rounded-md p-2 transform -translate-x-1/2">
              <p className="text-sm text-gray-700">📞 +91 98765 43210</p>
              <p className="text-sm text-gray-700">✉️ yaswanth@admin.com</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Page Content */}
      <div>{home && <Jobs 
        popup={popup} setPopup={setPopup} 
        applicantsPopup={applicantsPopup} setApplicantsPopup={setApplicantsPopup} setJobPostId={setJobPostId}
        />}</div>
      {/* <div>{applied && <Applied />}</div>
      <div>{short && <Shortlisted />}</div>
      <div>{profile && <Profile />}</div> */}
      <div>{applicantsPopup && <Applicants setApplicantsPopup={setApplicantsPopup} jobPostId={jobPostId} />}</div>
      <div>{popup && <JobPopUp setPopup={setPopup} />}</div>
    </div>
  );
}

export default NavBar;
