import { useEffect, useState, useRef } from 'react';
import { IproductsData } from '../util/types/products';
import { useScrollTop } from '../hooks/scrollToTop';
import { FRAMER_PAGE_TRANSITION } from '../util/animation/page';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUserCart } from '../features/cartSlice';
import { increasePage, decreasePage, currentPage } from '../features/pageSlice';
import { useTypedDispatch, useTypedSelector } from '../app/hooks';
import Loading from '../components/loading';
import Product from '../components/product';
import axios from 'axios';
import { BackendURL } from '../util/url';

const Home = () => {
  const dispatch = useTypedDispatch();
  const page = useTypedSelector(currentPage);
  const pageRef = useRef<any>();
  const [data, setData] = useState<IproductsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useScrollTop();

  const handleNext = () => {
    if (data.length <= 12) {
      dispatch(increasePage());
      setTimeout(() => {
        if (pageRef.current) {
          window.scrollTo({
            top: pageRef.current.offsetTop - 100,
            behavior: 'smooth',
          });
        }
      }, 50);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      dispatch(decreasePage());
      setTimeout(() => {
        if (pageRef.current) {
          window.scrollTo({
            top: pageRef.current.offsetTop - 100,
            behavior: 'smooth',
          });
        }
      }, 50);
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
    const calldata = async () => {
      setIsLoading(false);
      try {
        let response = await axios.get(
          `${BackendURL}/api/v1/product`,
          {
            params: {
              page: page,
              category: null,
              price: null,
              sort: null,
            },
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
  }, [page]);

  return (
    <>
      <section className="h-[70vh] md:h-[75vh] lg:h-[80vh] w-full bg-mid pt-[4.5rem] ">
        <AnimatePresence mode="wait">
          <motion.div
            {...FRAMER_PAGE_TRANSITION}
            className="bg-[url(/backdrop.webp)] flex justify-center items-center overflow-hidden bg-cover bg-center bg-no-repeat relative h-full w-full"
          >
            <div className="text-text text-center px-4 sm:px-6 md:px-0 flex flex-col justify-center items-center gap-4 font-heading">
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold">
                VERDANT MARKET
              </span>
              <span className="text-base sm:text-lg md:text-xl font-normal">
                one spot for all plants
              </span>
              <button
                onClick={handelShop}
                className="w-40 sm:w-48 h-10 sm:h-12 bg-background rounded-2xl font-normal text-sm sm:text-base"
              >
                Shop now
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className=" md:min-h-[37vh] min-h-[32vh] w-full flex justify-center items-center bg-background text-text font-context mb-3 px-4">
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%] flex flex-col justify-around items-center text-center gap-4">
          <div className="font-semibold text-xl sm:text-2xl tracking-widest">
            OUR COLLECTION
          </div>
          <div className="font-normal text-sm sm:text-base">
            I'm a paragraph. Click here to add your own text and edit me. It's
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font. I'm a great place for you to
            tell a story and let your users know a little more about you.
          </div>
        </div>
      </section>

      {isLoading ? (
        <>
          <section className="px-4">
            <div
              className='grid sam lg:grid-cols-3 grid-cols-2 gap-5 bg-background'
              ref={pageRef}>
              {data.map((item, index) => {
                return <Product key={index} {...item}></Product>;
              })}
            </div>
          </section>

          <section className="bg-background flex justify-center items-center pt-6 pb-20  gap-4 ">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className={`h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center rounded-full transition-all
                ${page === 0
                  ? 'bg-highlist cursor-not-allowed'
                  : 'bg-primary hover:bg-highlist text-text'
                }`}>
              <img src="/chevronsleft.svg" alt="Previous page" className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </button>

            <span className="text-text font-medium px-4">
              Page {page + 1}
            </span>

            <button
              onClick={handleNext}
              disabled={data.length < 12}
              className={`h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center rounded-full transition-all
              ${data.length < 12
                  ? 'bg-highlist cursor-not-allowed'
                  : 'bg-primary hover:bg-highlist text-text'
                }`}>
              <img src="/chevronsright.svg" alt="Next page" className="h-5 w-5" />
              <span className="sr-only">Next</span>
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
