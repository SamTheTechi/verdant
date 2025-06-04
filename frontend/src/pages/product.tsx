import { useEffect, useState } from 'react';
import { FRAMER_PAGE_TRANSITION } from '../util/animation/page';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Loading from '../components/loading';
import { IproductsData } from '../util/types/products';
import axios from 'axios';

const Backend = `http://localhost:5000`;

const Product = () => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expand, setExpand] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);
  const [data, setData] = useState<IproductsData>();

  const handelChange = (e: any) => {
    setCount(e.target.value);
  };

  const handelAdditem = async () => {
    try {
      const response = await axios.post(
        // `${window.location.origin}/api/v1/cart/additem`,
        `${Backend}/api/v1/cart/additem`,
        {
          productId: data?._id,
          count: count,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert(`itemadded`);
      }
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    const getitem = async () => {
      try {
        const response = await axios.get(
          // `${window.location.origin}/api/v1/${pathname.split('/')[2]}`
          `${Backend}/api/v1/${pathname.split('/')[2]}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        throw e;
      }
    };
    getitem();
  }, []);

  return (
    <>
      <section className='h-[93vh] w-full bg-mid pt-[4.5rem] flex justify-center font-context font-normal'>
        <AnimatePresence>
          {isLoading ? (
            <Loading height={100} context='' />
          ) : (
            <motion.div
              {...FRAMER_PAGE_TRANSITION}
              className='h-[100%] w-[60rem] flex flex-row justify-center items-center'>
              <div className='h-[90%] w-[60%] p-4 flex justify-center'>
                <div className='overflow-hidden h-[100%] relative'>
                  <img
                    src={data?.image}
                    alt={data?.name}
                    className='h-fit object-cover object-center '
                  />
                </div>
              </div>
              <div className='h-[90%] w-[40%] p-4 flex flex-col justify-around items-center'>
                <div className='self-start'>
                  <div className='text-4xl pb-1'>{data?.name}</div>
                  <div>{data?.category}</div>
                </div>
                <div className='text-3xl self-start'>${data?.price}</div>
                <div
                  className={`${expand ? `line-clamp-3` : ``
                    } text-sm pr-6 font-light`}
                  onClick={() => setExpand(!expand)}>
                  {data?.description}
                  <span className=' underline'>
                    {expand ? `` : ` Read less`}
                  </span>
                </div>
                <div className='text-1xl font-extralight self-start flex flex-col'>
                  <label>Quantity</label>
                  <input
                    type='number'
                    name='count'
                    onChange={handelChange}
                    value={count}
                    min={1}
                    max={99}
                    className='w-14 h-10 px-1'
                  />
                </div>
                <div className='w-[100%] grid gap-3 font-normal'>
                  <button
                    onClick={handelAdditem}
                    className='bg-mid text-dark dark:bg-dark dark:text-mid border-2 border-dark dark:border-mid h-10 w-full rounded-sm'>
                    Add to Cart
                  </button>
                  <button className='bg-dark text-mid dark:bg-mid dark:text-dark h-10 w-full rounded-sm'>
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};
export default Product;
