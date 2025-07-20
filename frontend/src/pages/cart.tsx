import { AnimatePresence, motion } from 'framer-motion';
import { useTypedSelector, useTypedDispatch } from '../app/hooks';
import { cartList, fetchUserCart } from '../features/cartSlice';
import { FRAMER_CART_ITEM } from '../util/animation/cart';
import RazorpayPayment from '../components/razorpay';
import { useEffect, useState } from 'react';
import Loading from '../components/loading';
import { BackendURL } from '../util/url';
import axios from 'axios';

const Cart = () => {
  const dispatch = useTypedDispatch();
  const userItem = useTypedSelector(cartList);
  const [total, setTotal] = useState<number>(0);

  const [showRazorpay, setShowRazorpay] = useState(false);
  const [razorpayOrderId, setRazorpayOrderId] = useState('');
  const [razorpayAmount, setRazorpayAmount] = useState(0);

  const [isLoading, setLoading] = useState<{ value: boolean; context: string }>({
    value: true,
    context: 'loading',
  });

  const handleRemoveItem = async (productId: string) => {
    try {
      await axios.patch(
        `${BackendURL}/api/v1/cart/clearitem`,
        { productId },
        { withCredentials: true }
      );
      dispatch(fetchUserCart());
    } catch (e) {
      throw e;
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`${BackendURL}/api/v1/cart/clearcart`, {
        withCredentials: true,
      });
      dispatch(fetchUserCart());
    } catch (e) {
      throw e;
    }
  };

  const handleClick = async () => {
    try {
      const response = await axios.get(`${BackendURL}/api/v1/pay/checkout`, {
        withCredentials: true,
      });
      setRazorpayOrderId(response.data.order_id);
      setRazorpayAmount(response.data.amount);
      setShowRazorpay(true);
    } catch (e) {
      throw e;
    }
  };

  const count = () => {
    let val: number = 0;
    userItem.map((item) => {
      val += item.count * item.price;
    });
    setTotal(Math.ceil(val));
  };

  useEffect(() => {
    count();
    setLoading({ value: false, context: '' });
  }, [userItem]);


  return (

    <section className='w-full flex justify-center bg-background text-text pt-[4.5rem] px-16 lg:md-12 md:px-6'>
      <AnimatePresence mode='wait'>
        {isLoading.value ? (
          <Loading height={100} context={`${isLoading.context}`} />
        ) : (
          <motion.div
            className='w-full min-h-[calc(100vh-6.5rem)] flex flex-col md:flex-row md:justify-between relative md:pb-0'
          >

            {/* Left Section - Cart Items */}
            <div className='w-full md:w-[67%] px-4 md:h-full flex flex-col'>
              <div className='flex justify-around items-center h-[4rem]'>
                <div className='font-heading p-3 text-3xl md:text-5xl'>My cart</div>
                {userItem.length > 0 && (
                  <div
                    onClick={handleClearCart}
                    className='text-sm md:text-base flex justify-center items-center text-dark rounded-lg bg-red-400 h-8 w-24 md:w-28 p-1 cursor-pointer'>
                    Clear-Cart
                  </div>
                )}
              </div>

              <hr />

              {/* Scrollable Cart Area */}
              <div className='flex-1 overflow-y-auto max-h-[calc(100vh-6.5rem-4rem-2rem)] pr-2'>
                {userItem.map((product: any) => (
                  <AnimatePresence mode='wait' key={product._id}>
                    <motion.div {...FRAMER_CART_ITEM} className='flex justify-between items-center flex-wrap'>
                      <div className='px-2 py-3'>
                        <div className='flex justify-start items-center py-1 gap-3'>
                          <img
                            src={product.image}
                            alt={product.name}
                            className='object-cover object-center h-28 w-28 md:h-32 md:w-32'
                          />
                          <div className='flex flex-col'>
                            <span className='text-base md:text-lg'>{product.name}</span>
                            <span className='text-sm md:text-base'>${product.price}</span>
                          </div>
                        </div>
                        <div>Total: ${Math.ceil(product.price * product.count)}</div>
                      </div>
                      <div className='self-start m-4 mr-6'>
                        <button onClick={() => handleRemoveItem(product._id)} className='h-6 w-6 bg-text'>
                          <img src='/garbage.svg' alt='Remove' />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className='w-full md:w-[30%] bg-background flex justify-center items-center mt-8 md:mt-0 fixed bottom-[4rem] md:relative md:bottom-auto md:h-full'>
              <div className='w-full flex flex-col gap-2'>
                <h2 className='font-semibold text-xl md:text-2xl'>Order summary</h2>
                <hr className='my-2 md:my-4' />

                <div className='flex justify-between text-sm md:text-base'>
                  <span>Subtotal:</span>
                  <span>${total}</span>
                </div>

                <div className='flex justify-between mt-1 md:mt-2 text-sm md:text-base'>
                  <span>Total:</span>
                  <span>${total}</span>
                </div>

                <div className='mt-4'>
                  <button
                    onClick={handleClick}
                    className='bg-primary rounded-xl text-base text-background font-medium h-12 w-full'>
                    Check Out
                  </button>
                </div>

                {showRazorpay && (
                  <RazorpayPayment
                    order_id={razorpayOrderId}
                    amount={razorpayAmount}
                    onSuccess={() => {
                      alert('Payment successful');
                      setShowRazorpay(false);
                    }}
                    onFailure={() => {
                      alert('Payment failed');
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
  );
};

export default Cart;
