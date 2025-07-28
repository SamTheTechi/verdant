import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonLink } from '../components/button'
import { isLoggedIn } from '../features/userSlice';
import { useTypedSelector } from '../app/hooks';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLogged = useTypedSelector(isLoggedIn);

  const handleHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 max-w-7xl w-full z-10 bg-background shadow-md">
      <div className="mx-auto h-[4.5rem] flex justify-between items-center px-6 sm:px-12 text-2xl text-text font-heading">
        <div className="font-bold tracking-wider text-highlist">VERDANT MARKET</div>

        <motion.button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 1.1 }}
          animate={{ rotate: menuOpen ? -90 : 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden focus:outline-none"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-[4.5rem] left-0 w-full bg-background md:hidden"
            >
              <motion.ul
                className="flex flex-col text-xl items-center py-4 space-y-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <li>
                  <ButtonLink to={`/`} variant='outline' className='min-w-56' onClick={handleHome}>Home</ButtonLink>
                </li>
                {isLogged ? (
                  <>
                    <li>
                      <ButtonLink to={`/logout`} variant='outline' className='min-w-56'>Log Out</ButtonLink>
                    </li>
                    <li>
                      <ButtonLink to={`/cart`} variant='outline' className='min-w-56'>Cart</ButtonLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <ButtonLink to={`/login`} variant='outline' className='min-w-56'>Log In</ButtonLink>
                    </li>
                    <li>
                      <ButtonLink to={`/signup`} variant='outline' className='min-w-56'>Sign Up</ButtonLink>
                    </li>
                  </>
                )}
                <li>
                  <a className="flex items-center justify-center rounded-xl text-base font-medium transition-all disabled:opacity-50 pointer-events-auto focus:outline-none h-10 min-w-56 px-7 bg-primary text-background hover:bg-secondary"
                    href='/docs'>
                    API docs
                  </a>
                </li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden md:flex md:items-center md:justify-end">
          <ul className="flex flex-row space-x-6 text-xl items-center">
            <li>
              <ButtonLink to={`/`} onClick={handleHome}>Home</ButtonLink>
            </li>
            <li>
              <a className="flex items-center justify-center rounded-xl text-base font-medium transition-all disabled:opacity-50 pointer-events-auto focus:outline-none h-10 min-w-20 px-7 bg-primary text-background hover:bg-secondary"
                href='/docs'>
                API docs
              </a>
            </li>
            {isLogged ? (
              <>
                <li>
                  <ButtonLink to={`/logout`}>Log Out</ButtonLink>
                </li>
                <li>
                  <ButtonLink to={`/cart`} variant='outline'>Cart</ButtonLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <ButtonLink to={`/login`}>Log In</ButtonLink>
                </li>
                <li>
                  <ButtonLink to={`/signup`} variant='outline'>Sign Up</ButtonLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
