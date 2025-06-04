import { useEffect, useState, useRef } from 'react';
import { IproductsData } from '../util/types/products';
import { useScrollTop } from '../hooks/scrollToTop';
import { FRAMER_PAGE_TRANSITION } from '../util/animation/page';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUserCart } from '../features/cartSlice';
import { useTypedDispatch } from '../app/hooks';
import { setOffset, closePanal } from '../features/extraSlice';
import Loading from '../components/loading';
import Product from '../components/product';
import axios from 'axios';
import SlidePanal from '../components/sidePanal';
import { BackendURL } from '../util/url';

const Home = () => {
  const dispatch = useTypedDispatch();
  const pageRef = useRef<any>();
  const [data, setData] = useState<IproductsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<any>({
    page: 0,
    category: null,
    price: null,
    sort: null,
  });
  useScrollTop();

  const handleNext = () => {
    if (data.length <= 12) {
      setOptions({ ...options, page: (options.page += 1) });
      setTimeout(() => {
        if (pageRef.current) {
          window.scrollTo({
            top: pageRef.current.offsetTop - 100,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  };

  const handlePrev = () => {
    if (options.page > 0) {
      setOptions({ ...options, page: (options.page -= 1) });
      setTimeout(() => {
        if (pageRef.current) {
          window.scrollTo({
            top: pageRef.current.offsetTop - 100,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  };

  const handelShop = () => {
    if (pageRef.current) {
      window.scrollTo({
        top: pageRef.current.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (pageRef.current) {
      const val: number = pageRef.current.offsetTop - 100;
      dispatch(setOffset(val));
    }
  }, [data]);

  useEffect(() => {
    const calldata = async () => {
      try {
        let response = await axios.get(
          // `${window.location.origin}/api/v1/getproduct`,
          `${BackendURL}/api/v1/getproduct`,
          {
            params: { ...options },
          }
        );
        setData(response.data.getitem);
        setIsLoading(true);
      } catch (e) {
        setIsLoading(false);
        throw e;
      }
    };
    dispatch(fetchUserCart());
    calldata();
  }, [options.page]);

  return (
    <>
      <section
        onClick={() => dispatch(closePanal())}
        className='h-[90vh] w-full bg-mid pt-[4.5rem]'>
        <AnimatePresence mode='wait'>
          <motion.div
            {...FRAMER_PAGE_TRANSITION}
            className=' bg-[url(/imageClip.jpg)] flex justify-center items-center overflow-hidden bg-cover bg-center bg-no-repeat relative h-full w-full backdrop-blur-lg'>
            <div className='h-[40%] w-[50%] text-light flex flex-col justify-evenly items-center text-xl font-normal font-heading'>
              <span className='tracking-widest text-6xl'>VERDANT MARKET</span>
              <span className='font-normal'>one spot for all plants</span>
              <br />
              <button
                onClick={handelShop}
                className='w-48 h-12 bg-dark rounded-sm font-normal'>
                Shop now
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      <SlidePanal />
      <section
        onClick={() => dispatch(closePanal())}
        className='h-[37vh] w-full flex justify-center items-center bg-light dark:bg-dark text-dark dark:text-light font-light font-context mb-3'>
        <AnimatePresence>
          <motion.div className='h-[60%] w-[45%] flex flex-col justify-around items-center'>
            <div className='font-normal text-2xl tracking-widest'>
              OUR COLLECTION
            </div>
            <div className=' text-center'>
              I'm a paragraph. Click here to add your own text and edit me. It's
              easy. Just click “Edit Text” or double click me to add your own
              content and make changes to the font. I'm a great place for you to
              tell a story and let your users know a little more about you.
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      {isLoading ? (
        <>
          <section
            onClick={() => dispatch(closePanal())}
            className='grid sam grid-cols-3 gap-3 bg-mid dark:bg-dark'
            ref={pageRef}>
            {data.map((item, index) => {
              return <Product key={index} {...item}></Product>;
            })}
          </section>
          <section className='bg-mid dark:bg-dark flex justify-center items-center'>
            <button
              className='h-8 w-20 m-2 flex justify-center items-center rounded-sm bg-black dark:bg-mid text-mid dark:text-black'
              onClick={handlePrev}>
              <img src='chevronsleft.svg' alt='prev' />
            </button>
            <button
              className='h-8 w-20 m-2 flex justify-center items-center rounded-sm bg-black dark:bg-mid text-mid dark:text-black'
              onClick={handleNext}>
              <img src='chevronsright.svg' alt='next' />
            </button>
          </section>
        </>
      ) : (
        <Loading height={100} context=''></Loading>
      )}
    </>
  );
};

export default Home;
