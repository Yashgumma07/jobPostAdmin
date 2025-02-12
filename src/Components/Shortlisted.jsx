import React, { useState, useEffect } from 'react';
import { apiGet, apiDelete } from '../api/api_methods';
import Loader from './Loader';
import companyImg from '../images/company.jpg';
import { getId,setTotalShortlistedJobs, getTotalShortlistedJobs } from '../store/userStore';
import { MdCelebration } from "react-icons/md";

function Shortlisted() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [appliedData, setAppliedData] = useState([]);

  const fetchAppliedData = async () => {
    try {
      const applyData = await apiGet(`/api/applicant/get-all-applied-jobs/${getId()}`);
      if (applyData.status === 200) {
        setAppliedData(applyData.body.data);
        console.log('Applied data:', applyData.body.data);
        const shortlistedCount = applyData.body.data.filter(job => job.shortlisted).length;
        setTotalShortlistedJobs(shortlistedCount);
        console.log('Shortlisted count:', shortlistedCount);
        console.log('Total Shortlisted Jobs from local:', getTotalShortlistedJobs());
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

  const appliedJobs = data.filter((job) =>
    appliedData.some((appliedJob) => appliedJob.jobPostId === job._id && appliedJob?.shortlisted === true)
  );

  

  useEffect(() => {
    fetchData();
    fetchAppliedData();
  }, []);


  return (
    <div className="overflow-hidden">
      <div className="flex mx-[0%] mt-[10px] justify-center">
        <div className="flex-initial w-[80%]">
          {load && <Loader item="clock" />}
          {!load && (
            <div className="gridmain1 relative overflow-y-auto scroll-none">
              {appliedJobs.map((job, index) => {
                const appliedJob = appliedData.find(
                  (applied) => applied.jobPostId === job._id && applied?.Shortlisted===true
                );
                return (
                  <div key={index} className="element1">
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
                      </div>
                    </div>
                    <div className="flex justify-around mt-[20px]">
                      <button className="py-2 px-4 w-[300px] bg-[#4ccb39] font-medium text-white rounded-full flex items-center justify-center">
                        <MdCelebration className="mr-1" /> Congratulations you're Shortlisted
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

export default Shortlisted;
