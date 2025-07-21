import axios from 'axios';
import { FRAMER_AUTH } from '../util/animation/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useTypedDispatch } from '../app/hooks';
import { logOut } from '../features/userSlice';
import { ButtonLink } from '../components/button';
import { BackendURL } from '../util/url';


const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${BackendURL}/api/v1/auth/logout`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(logOut());
        navigate(`/`);
      }
    } catch (e) {
      alert('LogOut failed. Please check your credentials and try again.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/api/v1/auth/deleteAccount`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(logOut());
        navigate(`/`);
      }
    } catch (e) {
      alert('Error while Deleting your account');
    }
  };

  return (
    <>
      <nav className="max-w-7xl w-full z-10 bg-background shadow-md">
        <div className="mx-auto h-[4.5rem] flex justify-between items-center px-6 sm:px-12 text-2xl text-text font-heading">
          <div className="font-bold tracking-wider text-highlist">VERDANT MARKET</div>
          <ButtonLink variant='outline' to={'/'}>
            Back
          </ButtonLink>
        </div>
      </nav>


      <AnimatePresence mode='wait'>
        <motion.section
          {...FRAMER_AUTH}
          className='h-[84vh] w-full flex justify-center items-center'>
          <div className='w-[80%] md:w-[60%] lg:w-[40%] flex flex-col justify-center gap-6'>
            <div className='font-context flex flex-col justify-center items-center text-text'>
              <h1 className='font-normal text-6xl p-1 items-center text-center'>Log Out</h1>
              <h3 className='text-xl p-1'>
                <span className='font-normal'>You sure want to Leave? </span>
                <Link to={`/signup`}>
                  <span className='text-text font-semibold'>Go back</span>
                </Link>
              </h3>
            </div>


            <div className='w-full md:w-auto flex flex-col md:flex-row justify-center gap-6 items-center'>
              <button
                onClick={handleLogout}
                className='text-highlist bg-primary items-center justify-center rounded-2xl text-base font-medium transition-all pointer-events-auto h-12 w-1/3'>
                Log Out
              </button>
              <button
                onClick={handleDelete}
                className='text-highlist bg-primary items-center justify-center rounded-2xl text-base font-medium transition-all pointer-events-auto h-12 w-1/3'>
                Delete Account
              </button>
            </div>
          </div>
        </motion.section >
      </AnimatePresence >
    </>
  );
};

export default LogOut;
