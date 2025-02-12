import React, { useState, useEffect } from 'react';
import { apiGet, apiDelete } from '../api/api_methods';
import Loader from './Loader';
import companyImg from '../images/company.jpg';
import applicantsImg from '../images/applicants.png';
import { getId,setTotalAppliedJobs } from '../store/userStore';
import { FaCircleCheck } from "react-icons/fa6";

function Applied() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [appliedData, setAppliedData] = useState([]);

  const getTimeDifference = (date) => {
    const createdDate = new Date(date);
    const currentDate = new Date();
    const diffInMs = currentDate - createdDate;

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMs < 60000) return "Just now";
    if (diffInMs < 3600000) return `${diffInMinutes} Mins ago`;
    if (diffInMs < 86400000) return `${diffInHours} Hrs ago`;
    return `${diffInDays} Days ago`;
  };

  const fetchAppliedData = async () => {
    try {
      const applyData = await apiGet(`/api/applicant/get-all-applied-jobs/${getId()}`);
      if (applyData.status === 200) {
        setAppliedData(applyData.body.data);
      } else {
        console.error('Failed to fetch applied jobs data:', applyData.status);
      }
    } catch (error) {
      console.error('Error in fetching applied jobs data:', error);
    }
  };

  const fetchData = async () => {
    setLoad(true);
    try {
      const verificationResp = await apiGet('/api/job/get-all-job-posts');
      if (verificationResp.status === 200) {
        setData(verificationResp.body.data);
      } else {
        console.error('Failed to fetch job posts:', verificationResp.status);
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
    } finally {
      setLoad(false);
    }
  };

  const fetchDeleteData = async (id) => {
    try {
      const verificationResp = await apiDelete(`/api/applicant/delete-application/${id}`);
      if (verificationResp.status === 200) {
        console.log('Data deleted successfully:', verificationResp.body.data);
        fetchAppliedData(); // Refresh applied data after deletion
      } else {
        console.error('Failed to delete data:', verificationResp.status);
      }
    } catch (error) {
      console.error('Error in deleting data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAppliedData();
  }, []);

  const appliedJobs = data.filter((job) =>
    appliedData.some((appliedJob) => appliedJob.jobPostId === job._id)
  );

  return (
    <div className="overflow-hidden">
      <div className="flex mx-[0%] mt-[10px] justify-center">
        <div className="flex-initial w-[80%]">
          {load && <Loader item="clock" />}
          {!load && (
            <div className="gridmain1 relative overflow-y-auto scroll-none">
              {appliedJobs.map((job, index) => {
                const appliedJob = appliedData.find(
                  (applied) => applied.jobPostId === job._id
                );
                return (
                  <div key={index} className="element">
                    <div className="mx-3 mt-3 text-2xl font-semibold">{job.jobTitle}</div>
                    <div className="mx-3 flex">
                      <div className="mr-2 font-medium">{job.jobType}</div>
                      <div className="font-medium text-gray-500">
                        Salary: {job.salaryMin}-{job.salaryMax} LPA
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="comLogo">
                        <img src={job.logo ? job.logo : companyImg} alt="Company Logo" />
                      </div>
                      <div>
                        <div className="mr-2 text-xl font-medium">{job.company}</div>
                        <div className="font-medium text-gray-500">Location: {job.location}</div>
                        <div className="ago text-gray-400">
                          {getTimeDifference(appliedJob?.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="my-5 mx-5 flex">
                      <img src={applicantsImg} alt="Applicants Icon" />
                      <div className="mx-2 font-medium">{job.applicants}+ Applicants</div>
                    </div>
                    <div className="flex justify-around">
                      <button
                        className="py-2 px-4 w-[120px] bg-white border-[2px] border-red-400 text-red-600 rounded-md flex items-center justify-center"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to withdraw your application?")) {
                            fetchDeleteData(appliedJob._id);
                          }
                        }}
                      >
                        Withdraw!
                      </button>

                      <button className="py-2 px-4 w-[120px] bg-[#4ccb39] text-white rounded-md flex items-center justify-center">
                        <FaCircleCheck className="mr-1" /> Applied!
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Applied;
