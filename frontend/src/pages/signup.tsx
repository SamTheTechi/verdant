import axios from 'axios';
import { useTypedDispatch } from '../app/hooks';
import { FRAMER_AUTH } from '../util/animation/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IuserSignupCradential } from '../util/types/auth';
import { useNavigate, Link } from 'react-router-dom';
import { logIn } from '../features/userSlice';
import { ButtonLink } from '../components/button';
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
      <nav className="max-w-7xl w-full z-10 bg-background shadow-md">
        <div className="mx-auto h-[4.5rem] flex justify-between items-center px-6 sm:px-12 text-2xl text-text font-heading">
          <div className="font-bold tracking-wider text-highlist">VERDANT MARKET</div>
          <ButtonLink variant='outline' to={'/'}>
            Skip?
          </ButtonLink>
        </div>
      </nav>

      <AnimatePresence mode='wait'>
        <motion.section
          {...FRAMER_AUTH}
          className='h-[83vh] w-full flex justify-center items-start'>
          <div className='h-[90%] w-[85%] md:w-[65%] lg:w-[40%] flex flex-col justify-evenly'>
            <div className='font-context flex flex-col justify-center items-center text-text'>
              <h1 className='text-6xl p-1'>Sign Up</h1>
              <h3 className='text-xl  p-1'>
                <span className='font-light'>Already have an account?</span>
                <Link to={`/login`}>
                  <span className='text-text'> Log In</span>
                </Link>
              </h3>
            </div>

            <form
              onSubmit={handleSubmit}
              className='h-64 flex flex-col justify-evenly items-center'>
              <div className='h-[68%] flex flex-col justify-evenly items-center mt-[-2rem] gap-2'>
                <input
                  type='text'
                  name='name'
                  onChange={handleChange}
                  value={cradential?.name}
                  placeholder='Name'
                  className='text-background rounded-lg p-1 px-2 border-[3px] focus:border-primary outline-none'
                />
                <input
                  type='email'
                  name='email'
                  onChange={handleChange}
                  value={cradential?.email}
                  placeholder='Email'
                  className='text-background rounded-lg p-1 px-2 border-[3px] focus:border-primary outline-none'
                />
                <input
                  type='password'
                  name='password'
                  onChange={handleChange}
                  value={cradential?.password}
                  placeholder='Password'
                  className='text-background rounded-lg p-1 px-2 border-[3px] focus:border-primary outline-none'
                />
              </div>
              <div className='h-[32%] w-full flex justify-center items-center'>
                <button
                  type='submit'
                  className='text-highlist bg-primary items-center justify-center rounded-xl text-base font-medium transition-all pointer-events-auto h-12 min-w-44'>
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
