import { FRAMER_PAGE_TRANSITION } from '../util/animation/page';
import { motion, AnimatePresence } from 'framer-motion';
import RazorpayPayment from '../components/razorpay';
import { IproductsData } from '../util/types/products';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/loading';
import { BackendURL } from '../util/url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setNotification } from '../features/notificationSlice'
import { addItem, CartState } from '../features/cartSlice';
import { useTypedDispatch } from '../app/hooks';

const Product = () => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(1);
  const [data, setData] = useState<IproductsData>();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [showRazorpay, setShowRazorpay] = useState(false);
  const [razorpayOrderId, setRazorpayOrderId] = useState('');
  const [razorpayAmount, setRazorpayAmount] = useState(0);

  const handelChange = (e: any) => {
    setCount(e.target.value);
  };

  const handelAdditem = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/api/v1/cart/additem`,
        {
          productId: data?._id,
          count: count.toString(),
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(setNotification(`Item Added!`, true));
        if (data != undefined) {
          const product: CartState = {
            _id: data._id,
            name: data.name,
            price: data.price,
            image: data?.image,
            count: count
          }
          dispatch(addItem(product))
        }
      }
    } catch (e) {
      navigate('/login');
    }
  };

  const handleBuyNow = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/api/v1/pay/buyone`,
        {
          productId: data?._id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setRazorpayOrderId(response.data.order_id);
        setRazorpayAmount(response.data.amount);
        setShowRazorpay(true);
      }
    } catch (e) {
      navigate('/login');
    }
  };

  useEffect(() => {
    const getitem = async () => {

      try {
        const response = await axios.get(
          `${BackendURL}/api/v1/${pathname.split('/')[2]}`
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
      <section className='h-full w-full bg-background pt-[4.5rem] flex justify-center font-context font-normal'>
        <AnimatePresence>
          {isLoading ? (
            <Loading height={100} context='' />
          ) : (
            <motion.div
              {...FRAMER_PAGE_TRANSITION}
              className='h-full w-full max-w-6xl flex flex-col lg:flex-row justify-center items-center py-8 lg:py-12 px-4 lg:px-0'>

              <div className='h-auto w-full lg:w-1/2 p-4 flex justify-center'>
                <div className='overflow-hidden relative h-96 w-80 flex-shrink-0 mx-auto'>
                  <img
                    src={data?.image}
                    alt={data?.name}
                    className='w-full h-full object-cover object-center '
                  />
                </div>
              </div>

              <div className='h-auto w-full lg:w-1/2 p-4 flex flex-col text-text justify-around items-center lg:items-start gap-8'>

                <div className='w-full'>

                  <div className='self-start'>
                    <div className='text-3xl md:text-4xl pb-1'>{data?.name}</div>
                    <div className='text-sm md:text-base text-secondary'>{data?.category}</div>
                  </div>

                  <div className='text-2xl md:text-3xl self-start mt-4'>${data?.price}</div>
                </div>


                <div
                  className={`text-sm pr-6 font-normal mt-4'`}>
                  {data?.description}
                </div>


                <div className='w-full'>

                  <div className='text-1xl font-extralight self-start flex flex-col'>
                    <label>Quantity</label>
                    <div className='flex items-center mt-2'>
                      <button
                        onClick={() => setCount(prevCount => Math.max(1, prevCount - 1))}
                        className='bg-primary text-background px-3 py-1 rounded-l-sm'
                      >
                        -
                      </button>
                      <input
                        type='number'
                        name='count'
                        onChange={handelChange}
                        value={count}
                        min={1}
                        max={99}
                        className='w-12 h-8 text-center text-background outline-none'
                      />
                      <button
                        onClick={() => setCount(prevCount => Math.min(99, prevCount + 1))}
                        className='bg-primary text-background px-3 py-1 rounded-r-sm'
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className='w-full gap-4 flex flex-col items-center md:items-start font-normal mt-8 mb-0 md:mb-12'>

                    <button
                      onClick={handelAdditem}
                      className='text-highlist bg-primary text-background items-center justify-center rounded-2xl text-base font-medium transition-all pointer-events-auto h-12 w-3/4 md:min-w-44 align-middle'>
                      Add to Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className='border-2 border-primary text-highlist hover:bg-secondry items-center justify-center rounded-2xl text-base font-medium transition-all pointer-events-auto h-12 w-3/4 md:min-w-44'>
                      Buy Now
                    </button>

                  </div>
                  {showRazorpay && (
                    <RazorpayPayment
                      order_id={razorpayOrderId}
                      amount={razorpayAmount}
                      onSuccess={() => {
                        setShowRazorpay(false);
                        navigate('/greet');
                        dispatch(setNotification("Transection Completed", true, 5000));
                      }}
                      onFailure={() => {
                        dispatch(setNotification("Transection Failed", false, 5000));
                        setShowRazorpay(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}; ''
export default Product;
