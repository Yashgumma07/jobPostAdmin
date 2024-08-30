import React,{useState} from 'react'
import JobPopUp from './JobPopUp';


function Top() {
  const [popup,setPopup] = useState(false);
  return (
    <div className='Topmain'>
      <div className='Topp'>
        <div className="Space"></div>
        <div>
          <ul className='Top'>
            <img className="logo" src="../src/images/logo.png" alt='image'/>
            <li className="list">Home</li>
            <li className="list">Find Jobs</li>
            <li className="list">Find Talents</li>
            <li className="list">About us</li>
            <li className="list">Testimonials</li>
            <li className="list bt"><button onClick={()=>{setPopup(true)}} className="button"></button></li>
          </ul>
          {popup && <JobPopUp setPopup={setPopup} />}
        </div>
        <div className="Space"></div>
      </div>
      <div className="middlemain">
        <div className="middle midfst">
          <div><img className='search' src="../src/images/search.png" /></div>
          <div className='midtxt'>Search By Job Title, Role</div>
        </div>
        <div className="middle">
          <div><img className="line" src='../src/images/line.png' /></div>
          <div><img className="location" src="../src/images/Location.png" /></div>
          <div className='midtxt'>Preffered Location</div>
          <div><img className='down' src='../src/images/Down.png' /></div>
        </div>
        <div className="middle">
          <div><img className="line" src='../src/images/line.png' /></div>
          <div><img className="type" src='../src/images/job.png' /></div>
          <div className='midtxt'>Job Type</div>
          <div><img className='down2' src='../src/images/Down.png' /></div>
        </div>
        <div className="middle midlst">
          <div><img className="line" src='../src/images/line.png' /></div>
          <div>
            <div className='salary'>
              <div className='month'>Salary Per Month</div>
              <div className='month value'>₹50k - ₹80k</div>
            </div>
            <div className='range'>
              <img className='dot' src='../src/images/dot.png' />
              <img className='dark' src='../src/images/dark.png' />
              <img className='dot2' src='../src/images/dot.png' />
              <img className='light' src='../src/images/light.png' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top
