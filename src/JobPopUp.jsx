import React,{useState} from 'react'

function JobPopUp({setPopup}) {
  const handleClickOutside = (e) => {
    if (e.target.className === 'overlay') {
      setPopup(false);
    }
  }
  return (
    <div className='overlay' onClick={handleClickOutside}>
    <div className='pop'>
      <div className='pophead'>Create Job Opening</div>
      <div className='title'>
        <div className='textinput'>
          Job Title 
          <input type='text' placeholder='Job Title' />
        </div>
          <div className='textinput'>
          Company Name
          <input type='text' placeholder='Amazon, Microsoft, Swiggy' />
        </div>
      </div>
      <div className='title'>
          <div className='textinput'>
          Location
            <select className='select'>
              <option disabled>Choose Preferred Location</option>
              <option>Chennai</option>
              <option>Bangolore</option>
              <option>Hyderabad</option>
              <option>Visakhapatnam</option>
            </select>
        </div>
          <div className='textinput'>
          Job Type
            <select className='select'>
              <option disabled>Choose Job Type</option>
              <option>Internship</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
            </select>
        </div>
      </div>
      <div className='title'>
          <div className='textinput'>
          Salary Range
          <div className="range">
              <input type='number' placeholder='₹0' />
              <input type='number' placeholder='₹12,00,000' />
          </div>
          
        </div>
          <div className='textinput'>
          Application Deadline
          <input type='date' placeholder=' ' />
        </div>
      </div>
        <div className='textinput jobdis'>
          Job Discription 
          <textarea placeholder='Please share a discriptionm to let the candidate know more about the job role'></textarea>
        </div>
      <div className='finalbts'>
        <div className='draft'>
          <button>Save Draft<img src="./src/images/downarr.png" ></img></button>
        </div>
        <div className='publish'>
            <button>Punlish<img src="./src/images/rightarr.png" ></img></button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default JobPopUp
