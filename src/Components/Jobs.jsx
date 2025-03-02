import React, { useState, useEffect } from 'react'
import { apiGet, apiPostPut, apiDelete } from '../api/api_methods';
import Loader from './Loader';
import Filters from './Filters';
import companyImg from '../images/company.jpg';
import applicantsImg from '../images/applicants.png';
import JobPopUp from './JobPopUp';
import { getId,setTotalJobs,setTotalAppliedJobs } from '../store/userStore';
import { FaCircleCheck } from "react-icons/fa6";
import Applicants from './Applicants';



function Jobs({ popup, setPopup, applicantsPopup, setApplicantsPopup, setJobPostId }) {
  const [data, setData] = useState([]);
  const [load,setLoad] = useState(false);
  const[search,setSearch] = useState('');
  const [appliedData, setAppliedData] = useState([]);
  
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobMode, setJobMode] = useState(['All']);
  const [roleType, setRoleType] = useState('');
  const [experience, setExperience] = useState('');

  const [details, setDetails] = useState(null);

  const getTimeDifference = (date) => {
    const createdDate = new Date(date);
    const currentDate = new Date();
    const diffInMs = currentDate - createdDate; // Difference in milliseconds

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMs < 60000) return "Just now"; // Less than 1 minute
    if (diffInMs < 3600000) return `${diffInMinutes}Mins ago`; // Less than 1 hour
    if (diffInMs < 86400000) return `${diffInHours}Hrs ago`; // Less than 1 day
    return `${diffInDays}Days ago`; // 1 or more days
  };

  // const fetchAppliedData = async () => {
  //   try{
  //     const applyData = await apiGet('/api/applicant/get-all-applied-jobs/'+getId());
  //     if(applyData.status === 200){
  //       setAppliedData(applyData.body.data);
  //       console.log('Applied data:',applyData.body.data);
  //       setTotalAppliedJobs(applyData.body.data.length);
  //     }else{
  //       console.error('Failed to fetch data:',applyData.status);
  //     }
  //   }
  //   catch(error){
  //     console.error('Error in fetching applied data:',error);
  //   }
  // };

  // const fetchData = async () => {
  //   setLoad(true);
  //   try {
  //     const verificationResp = await apiGet('/api/job/get-all-job-posts');

  //     if (verificationResp.status === 200) {
  //       setData(verificationResp.body.data);
  //       console.log('Data set successfully:', verificationResp.body.data);
  //       setTotalJobs(verificationResp.body.data.length);
  //     } else {
  //       console.error('Failed to fetch data:', verificationResp.status);
  //     }
  //   } catch (error) {
  //     console.error('Error in fetchData:', error);
  //   } finally{ 
  //     setLoad(false)};
  // };

  const fetchSearchData = async (e) => {
    if (e) e.preventDefault();
    setLoad(true);
    const data = {
      jobTitle: search,
      salaryMin: salaryMin,
      salaryMax: salaryMax,
      jobType: jobType,
      jobMode: jobMode[0] === 'All' ? '' : jobMode,
      role: roleType === 'Non-IT' ? 'nit' : (roleType === 'IT' ? 'it' : ''),
      experience: experience,

    };
    try {
      const verificationResp = await apiPostPut(data,'/api/job/get-search-job-posts','POST');
      if (verificationResp.status === 200) {
        setData(verificationResp.body.data);
        console.log('Data set successfully:', verificationResp.body.data);
        setTotalJobs(verificationResp.body.data?.length);
      } else {
        console.error('Failed to fetch data:', verificationResp.status);
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
    } finally{
      setLoad(false)};
  };

  const handleDelete = async (postId) => {
    if(!window.confirm('Are you sure you want to delete this job post?')) return;
    try {
      const verificationResp = await apiDelete(`/api/job/delete-job-post/${postId}`);
      if (verificationResp.status === 200) {
        console.log('Job post deleted successfully:', verificationResp.body.data);
        setPopup(false);
        fetchSearchData();
      } else {
        console.error('Failed to delete job post:', verificationResp.status, verificationResp.body);
      }
    } catch (error) {
      console.error('Error deleting job post:', error);
    }
  };

  useEffect(() => {
    //fetchData();
    //fetchAppliedData();
    fetchSearchData();
  }, []);

  return (
    <div className="overflow-hidden h-[750px] lg:h-[600px]">
      <div className="flex md:mx-[10%] mx-[0%] mt-[10px]">
        {/* <div className={`flex-auto hidden md:block`}> 
          <Filters 
          salaryMin={salaryMin} setSalaryMin={setSalaryMin}
          salaryMax={salaryMax} setSalaryMax={setSalaryMax}
          jobType={jobType} setJobType={setJobType}
          jobMode={jobMode} setJobMode={setJobMode}
          roleType={roleType} setRoleType={setRoleType}
          experience={experience} setExperience={setExperience} 
          fetchSearchData={fetchSearchData}
          />
        </div> */}
        <div className="flex-initial w-[1200px] md:ml-[50px] ml-[10px] p-0 lg:h-[700px] h-[900px]">
          <div>
            <h2 className="text-3xl font-bold">Created Jobs</h2>
            {/* <p className="font-medium text-gray-400 my-2">Complete list of jobs</p> */}
          </div>
          <form onSubmit={fetchSearchData} className="flex bg-[#F7F7F7] p-2 rounded-md my-5">
            <input 
            className="bg-[#F7F7F7] flex-1 p-3 m-0 rounded-md border-none focus:outline-none focus:border-none" 
            placeholder="Enter job title or company name..." 
            onChange={(e)=>setSearch(e.target.value)}
            />
            <button type='submit' className="py-2 px-10 bg-[#6300B3] text-white rounded-md">Search</button>
          </form>
          {load && <Loader item="clock" />}
          {!load && data?.length > 0 ? (<div className="gridmain relative h-full overflow-y-auto scroll-none">
            {data.slice().reverse().map((element,index)=>(
              <div key={index} className="element">
                <div className="mx-3 mt-3 text-2xl font-semibold">{element.jobTitle}</div>
                <div className="mx-3 flex">
                  <div className="mr-2 font-medium">{element.jobType}</div>
                  <div className="font-medium text-gray-500">Salary:{element.salaryMin}-{element.salaryMax}LPA</div>
                </div>
                <div className="flex items-center">
                  <div className="comLogo">
                    <img src={element.logo ? element.logo:companyImg} />
                  </div>
                  <div>
                    <div className="mr-2 text-xl font-bold">{element.company}</div>
                    <div className="text-sm font-medium text-gray-500">
                      Mode: {element.jobMode}, {element.role === 'nit'?"(Non-IT role)":"(IT role)"}
                    </div>
                    <div className="leading-tight text-sm font-medium text-gray-500">Location: {element.location}</div>
                    <div className="ago text-gray-400">{getTimeDifference(element.createdAt)}</div>
                  </div>
                </div>
                <div className="my-2 mx-5 flex text-sm font-medium text-gray-500">
                  Min Experience: {element.experience} years
                </div>
                <div className="mb-5 mx-5 flex">
                  <img src={applicantsImg} />
                  <div className="mx-2 font-medium">{element.applicants}+ Applicants</div>
                  
                </div>
                <div className="flex justify-around">
                  <div>
                    <div className="relative inline-block">
                      <button
                        className="py-2 px-3 bg-[#F7F7F7] text-[#6300B3] rounded-md"
                        onClick={() => { setApplicantsPopup(true), setJobPostId(element._id) }}
                      >
                        View Applicants
                      </button>
                    </div>
                  </div>
                  <div>
                    <button className="py-2 px-5 bg-[#fc8d80] text-white rounded-md"
                      onClick={() => { handleDelete(element._id) }}>Delete Post</button>
                  </div>
                </div>
              </div>
            ))}
          </div>):(
            <div className="flex justify-center items-center h-[400px]">
              <div className="text-2xl font-semibold m-5">No jobs found!</div>
            </div>
          )}
        </div>
        <div className="flex-auto"></div>
      </div>
    </div>
  )
}

export default Jobs
