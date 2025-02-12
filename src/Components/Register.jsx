import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiGet, apiPostPut } from '../api/api_methods';
import Loader from './Loader';
import { setId, getId, getEmailId, setEmailId } from '../store/userStore';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, confirmPassword);
    if (password === confirmPassword) {
      console.log('Password matched');
      setLoad(true);
      try {
        const verificationResp = await apiPostPut({ email: email, password: password }, '/api/register/add-user', 'POST');
        if (verificationResp.status === 200) {
          //console.log('Data set successfully:', verificationResp.body.data);
          setId(verificationResp.body?.data?._id);
          setEmailId(verificationResp.body?.data?.email);
          console.log('Id:', getId());
          console.log('Email:', getEmailId());
          navigate('/home');
        } else {
          console.error('Failed to fetch data:', verificationResp.status);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setLoad(false)
      };
    }
    else {
      alert('Password did not match');
    }
  };


  return (
    <div className='loginBg overflow-hidden min-h-screen'>
      <div className="flex flex-col justify-center">
        <div className="flex flex-col justify-center items-center my-10">
          <div className="mx-2 my-5"><h2 className="text-blue-700 text-2xl font-bold">Create Account</h2></div>
          <div className="px-5 font-bold"><p>Create an account so you can explore all the existing jobs</p></div>
        </div>
        {!load && <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center my-10">
            <div className='px-2 my-2'>
              <input className="px-2 py-2 loginInput" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='my-2 flex flex-col justify-end items-end'>
              <input className="px-2 py-2 loginInput" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='my-2 flex flex-col justify-end items-end'>
              <input className="px-2 py-2 loginInput"
                placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          <div className='flex justify-center'>
            <div className="my-8">
              <div>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-600 px-3 py-3 mx-2 my-2 rounded-md text-white font-bold text-xl w-[280px] shadow-lg shadow-blue-200">
                  Sign in</button>
              </div>
              <div>
                <Link to="/login">
                  <button className="px-3 py-3 mx-2 my-2 text-blue-800 hover:bg-blue-200 rounded-md text-xl font-bold w-[280px]">
                    Already have an account</button>
                </Link>
              </div>
            </div>
          </div>
        </form>}
        {load && <Loader item="bounce" />}
      </div>
    </div>
  )
}

export default Register
