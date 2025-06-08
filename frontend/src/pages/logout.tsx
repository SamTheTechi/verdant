import Confirm from '../components/confirm';
import axios from 'axios';
import { FRAMER_AUTH } from '../util/animation/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useTypedDispatch } from '../app/hooks';
import { logOut } from '../features/userSlice';
import { useState } from 'react';

const Backend = `http://localhost:5000`;

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${Backend}/api/v1/auth/logout`,
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

  return (
    <>
      <nav className='h-[10vh] w-full text-2xl text-dark dark:text-light bg-mid dark:bg-dark font-heading flex justify-between items-center px-12'>
        <div className=' tracking-wider'>VERDANT MARKET</div>
      </nav>
      <AnimatePresence mode='wait'>
        <motion.section
          {...FRAMER_AUTH}
          className='h-[83vh] w-full flex justify-center items-start'>
          <div className='h-[80%] w-[40%] flex flex-col justify-evenly'>
            <div className='font-context flex flex-col justify-center items-center'>
              <h1 className='font-normal text-6xl p-1'>Log Out</h1>
              <h3 className='text-xl font-light p-1'>
                You sure want to Leave?
                <Link to={`/`}>
                  <span className='text-blue-500'> Go back</span>
                </Link>
              </h3>
            </div>

            <div className='h-[30%] w-full flex flex-col justify-evenly items-center'>
              <button
                onClick={handleLogout}
                className='w-52 h-12 rounded-full border-2 border-dark'>
                Log Out
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='w-52 h-12 rounded-full border-2 border-mid dark:border-dark text-mid dark:text-dark bg-dark dark:bg-light'>
                Delete Account
              </button>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
      {isOpen ? <Confirm isOpen={setIsOpen} /> : null}
    </>
  );
};

export default LogOut;
