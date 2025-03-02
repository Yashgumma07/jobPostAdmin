import React,{useState, useEffect} from 'react';
import { apiGet,apiPostPut } from '../api/api_methods';
import { getId,getEmailId } from '../store/userStore';

function JobPopUp({setPopup}) {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [logo, setLogo] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [deadLine, setDeadLine] = useState('');
  const [experience, setExperience] = useState('');
  const [jobMode, setJobMode] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      jobTitle,
      company,
      logo,
      location,
      jobType,
      salaryMin,
      salaryMax,
      deadLine,
      experience,
      jobMode,
      role,
      description,
    };
    try {
      const verificationResp = await apiPostPut(data, '/api/job/job-post', 'POST');
      if (verificationResp.status === 200) {
        console.log('Job Post Data', verificationResp.body.data);
        alert('Job post created successfully');
        setPopup(false);
      } else {
        console.error('Failed to submit data:', verificationResp.status, verificationResp.body);
      }
    } catch (error) {
      console.error('Error in submitting data:', error);
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.className === 'overlay') {
      setPopup(false);
    }
  }

  return (
    <div className='overlay' onClick={handleClickOutside}>
      <div className='pop'>
        <div className="popTitle">Create Job Post</div>
        <form onSubmit={handleSubmit}>
        <div className="popBody">
          <div className="section">
            <div className="sectionName">Job title</div>
            <div>
              <input className="sectionInput" placeholder="Please enter job title" 
              value={jobTitle} 
              required
              onChange={(e)=>setJobTitle(e.target.value)} />
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Company</div>
            <div>
              <input className="sectionInput" placeholder="Please enter company name"
                value={company} 
                required
                onChange={(e) => setCompany(e.target.value)} />
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Logo</div>
            <div>
              <input className="sectionInput" placeholder="Please enter company logo url"
                value={logo}
                required
                onChange={(e) => setLogo(e.target.value)} />
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Location</div>
            <div>
              <input className="sectionInput" placeholder="Please enter job location"
                value={location}
                required
                onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Job Type</div>
            <div>
              <select className="sectionInput" 
              value={jobType} 
              required
              onChange={(e)=>setJobType(e.target.value)}>
                <option value="">select</option>
                <option value="Part Time">Part Time</option>
                <option value="Full Time">Full Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Salary Range</div>
            <div className="flex">
              <input className="sectionInput" placeholder="Enter minimum salary"
                required
                type='number'
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)} />
              <input className="sectionInput" placeholder="Enter maximum salary"
                required
                type='number'
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)} />
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Deadline</div>
            <div>
              <input className="sectionInput" placeholder="Please enter deadline"
                required
                type='date'
                value={deadLine}
                onChange={(e) => setDeadLine(e.target.value)} />
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Experience</div>
            <div>
              <input className="sectionInput" placeholder="Please enter experience required"
                required
                type='number'
                value={experience}
                onChange={(e) => setExperience(e.target.value)} />
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Job Mode</div>
            <div>
              <select className="sectionInput"
                required
                value={jobMode}
                onChange={(e) => setJobMode(e.target.value)}>
                <option value="">select</option>
                <option value="office">Office</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Job Role</div>
            <div>
              <select className="sectionInput"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <option value="">select</option>
                <option value="it">IT</option>
                <option value="nit">Non-IT</option>
              </select>
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Description</div>
            <div>
              <textarea className="textInput" placeholder="Please enter the job description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
          <div className="apply">
            <button type='submit' className="applyBtn">Create Post</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  )
}

export default JobPopUp
