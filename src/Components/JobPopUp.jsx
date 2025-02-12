import React,{useState, useEffect} from 'react';
import { apiGet,apiPostPut } from '../api/api_methods';
import { getId,getEmailId } from '../store/userStore';

function JobPopUp({setPopup,applicationId}) {
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState(getEmailId()||'');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [resume, setResume] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName: name,
      qualification,
      experience,
      gender,
      dob,
      email,
      phone,
      address,
      resume,
      jobPostId: applicationId,
      userId: getId()
    };
    try {
      const verificationResp = await apiPostPut(data, '/api/applicant/apply', 'POST');
      if (verificationResp.status === 200) {
        console.log('Data submitted successfully:', verificationResp.body.data);
        alert('Application submitted successfully');
        try{
          const updateApplicants = await apiPostPut({ $inc: { applicants: 1 } },'/api/job/update-job-post/'+applicationId,'PUT');
          if(updateApplicants.status === 200){
            console.log('Applicants updated successfully:',updateApplicants.body.data);
          }
          else{
            console.error('Failed to update applicants:',updateApplicants.status);
          }
        }
        catch(error){
          console.error('Error in updating applicants:',error);
        }
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
        <div className="popTitle">Job Application</div>
        <form onSubmit={handleSubmit}>
        <div className="popBody">
          <div className="section">
            <div className="sectionName">Name</div>
            <div>
              <input className="sectionInput" placeholder="Please enter your name" 
              value={name} 
              onChange={(e)=>setName(e.target.value)} />
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Qualification</div>
            <div>
              <select className="sectionInput" 
              value={qualification} 
              onChange={(e)=>setQualification(e.target.value)}>
                <option value="">select</option>
                <option value="mtech">Mtech</option>
                <option value="btech">Btech</option>
                <option value="Degree">Degree</option>
                <option value="12th">12th</option>
                <option value="10th">10th</option>
              </select>
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Experience</div>
            <div>
              <select className="sectionInput"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}>
                <option value="">select</option>
                <option value="8+">8+ years</option>
                <option value="4-8">4-8 years</option>
                <option value="2-4">2-4 years</option>
                <option value="1+">1+ years</option>
                <option value="0-1">Fresher/less than 1 year</option>
              </select>
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Gender</div>
            <div>
              <select className="sectionInput"
                value={gender}
                onChange={(e) => setGender(e.target.value)}>
                <option value="">select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Date of Birth</div>
              <div>
                <input type="date" className="sectionInput" 
                value={dob}
                onChange={(e) => setDob(e.target.value)} /> 
              </div>
          </div>
          <div className="section">
            <div className="sectionName">Email</div>
            <div>
                <input className="sectionInput" placeholder="Please enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Phone Number</div>
            <div>
              <input className="sectionInput" placeholder="Please enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Address</div>
            <div>
              <input className="sectionInput" placeholder="Please enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
          <div className="section">
            <div className="sectionName">Resume</div>
            <div>
              <input className="sectionInput" placeholder="Please enter your resume link" 
                value={resume}
                onChange={(e) => setResume(e.target.value)}/>
            </div>
          </div>
          <div className="apply">
            <button type='submit' className="applyBtn">Submit Application</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  )
}

export default JobPopUp
