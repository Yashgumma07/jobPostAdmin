import React, { useState, useEffect } from 'react';
import { apiGet, apiPostPut } from '../api/api_methods';
import { FaCircleCheck } from "react-icons/fa6";

function Applicants({ setApplicantsPopup, jobPostId }) {
  const [data, setData] = useState([]);

  const fetchApplicants = async () => {
    try {
      const verificationResp = await apiGet(`/api/applicant/get-all-applications/${jobPostId}`);
      if (verificationResp.status === 200) {
        setData(verificationResp.body.data);
        console.log('Data received successfully:', verificationResp.body.data);
      } else {
        console.error('Failed to fetch data:', verificationResp.status, verificationResp.body);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const shortlist = async (applicantId) => {
    try {
      const verificationResp = await apiGet(`/api/applicant/shortlist/${applicantId}`);
      if (verificationResp.status === 200) {
        console.log('Applicant shortlisted successfully:', verificationResp.body.data);
        fetchApplicants();
      } else {
        console.error('Failed to shortlist applicant:', verificationResp.status, verificationResp.body);
      }
    } catch (error) {
      console.error('Error shortlisting applicant:', error);
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.className === 'overlay') {
      setApplicantsPopup(false);
    }
  }

  useEffect(() => {
    fetchApplicants();
  }, []);

  //if (!popup.isOpen) return null; // Hide popup if it's not open

  return (
    <div className='overlay' onClick={handleClickOutside}>
      <div className='pop'>
        <div className="popTitle mb-5">Job Applicants</div>
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="px-0">S/No.</th>
              <th className="px-0">Name</th>
              <th className="px-0">Qualification</th>
              <th className="px-0">Experience</th>
              <th className="px-0">Resume Link</th>
              <th className="px-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.userName}</td>
                  <td>{item.qualification}</td>
                  <td>{item.experience}</td>
                  <td>{item.resume}</td>
                  <td>
                    {item.shortlisted ? 
                    <button className="py-2 px-5 bg-[#63e238] text-white rounded-md">
                      Confirmed
                    </button>
                    : 
                    <button className="py-2 px-5 bg-[#e3d842] text-white rounded-md"
                      onClick={() => shortlist(item._id)}
                    >
                      confirm
                    </button>
                    }
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                  <td colSpan="2" className="py-5 text-center font-medium text-gray-500">
                    No applicants found
                  </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Applicants;
