import { motion, AnimatePresence } from 'framer-motion';
import { FRAMER_AUTH } from '../util/animation/auth';
import { ButtonLink } from '../components/button';

const Greet = () => {

  return (
    <>
      <nav className="max-w-7xl w-full z-10 bg-background shadow-md">
        <div className="mx-auto h-[4.5rem] flex justify-between items-center px-6 sm:px-12 text-2xl text-text font-heading">
          <div className="font-bold tracking-wider text-highlist">VERDANT MARKET</div>
        </div>
      </nav>

      <AnimatePresence mode='wait'>
        <motion.section
          {...FRAMER_AUTH}
          className='h-[83vh] w-full flex justify-center items-center'>
          <div className='w-[80%] md:w-[60%] lg:w-[40%] flex flex-col justify-center gap-8'>
            <div className='font-context flex flex-col justify-center items-center text-text'>
              <h1 className='font-normal text-5xl p-1 items-center text-center'>Thank You For Shopping With us</h1>
              <h3 className='text-xl p-1'>
                <span className='font-normal'>Do come again please ;)</span>
              </h3>
            </div>

            <div className='w-full md:w-auto flex flex-col md:flex-row justify-center gap-3 items-center'>
              <ButtonLink to={'/'} className='min-w-40'>
                Continue
              </ButtonLink>
              <ButtonLink to={'/cart'} className='min-w-40'>
                Track my Order
              </ButtonLink>
            </div>
          </div>
        </motion.section >
      </AnimatePresence >
    </>
  );
};

export default Greet;
