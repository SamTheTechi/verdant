import axios from 'axios';
import { useTypedDispatch } from '../app/hooks';
import { FRAMER_AUTH } from '../util/animation/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IuserSignupCradential } from '../util/types/auth';
import { useNavigate, Link } from 'react-router-dom';
import { logIn } from '../features/userSlice';
import { BackendURL } from '../util/url';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [cradential, setCradential] = useState<IuserSignupCradential>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCradential({
      ...cradential,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BackendURL}/api/v1/auth/signup`,
        cradential,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        navigate(`/`);
        dispatch(logIn());
      }
    } catch (e) {
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <>
      <nav className='h-[10vh] w-full text-2xl text-dark dark:text-light bg-mid dark:bg-dark font-heading flex justify-between items-center px-12'>
        <div className=' tracking-wider'>VERDANT MARKET</div>
        <span className='text-xl text-blue-500'>
          <Link to={`/`}>Skip?</Link>
        </span>
      </nav>
      <AnimatePresence mode='wait'>
        <motion.section
          {...FRAMER_AUTH}
          className='h-[83vh] w-full flex justify-center items-start'>
          <div className='h-[90%] w-[40%] flex flex-col justify-evenly'>
            <div className='font-context flex flex-col justify-center items-center'>
              <h1 className='font-normal text-6xl p-1'>Sign Up</h1>
              <h3 className='text-xl font-light p-1'>
                Already have an account?
                <Link to={`/login`}>
                  <span className='text-blue-500'> Log In</span>
                </Link>
              </h3>
            </div>
            <form
              onSubmit={handleSubmit}
              className='h-64 flex flex-col justify-evenly items-center'>
              <div className='h-[68%] flex flex-col justify-evenly items-center mt-[-2rem]'>
                <input
                  type='text'
                  name='name'
                  onChange={handleChange}
                  value={cradential?.name}
                  placeholder='Name'
                  className='p-1 w-64'
                />
                <input
                  type='email'
                  name='email'
                  onChange={handleChange}
                  value={cradential?.email}
                  placeholder='Email'
                  className='p-1 w-64'
                />
                <input
                  type='password'
                  name='password'
                  onChange={handleChange}
                  value={cradential?.password}
                  placeholder='Password'
                  className='p-1 w-64'
                />
              </div>
              <div className='h-[32%] w-full flex justify-center items-center'>
                <button
                  type='submit'
                  className='w-40 h-12 rounded-full border-2 border-dark'>
                  SignUp
                </button>
              </div>
            </form>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default Signup;
