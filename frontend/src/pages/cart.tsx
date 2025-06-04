import axios from 'axios';
import { useTypedSelector, useTypedDispatch } from '../app/hooks';
import { cartList, fetchUserCart } from '../features/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FRAMER_CART_ITEM } from '../util/animation/cart';
import { FRAMER_PAGE_TRANSITION } from '../util/animation/page';
import Loading from '../components/loading';
import { BackendURL } from '../util/url';

const Cart = () => {
  const dispatch = useTypedDispatch();
  const userItem = useTypedSelector(cartList);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setLoading] = useState<{ value: boolean; context: string }>(
    {
      value: true,
      context: 'loading',
    }
  );

  const handleRemoveItem = async (productId: string) => {
    try {
      await axios.patch(
        // `${window.location.origin}/api/v1/cart/clearitem`,
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
      // await axios.delete(`${window.location.origin}/api/v1/cart/clearitem`, {
      await axios.delete(`${BackendURL}/api/v1/cart/clearcart`, {
        withCredentials: true,
      });
      dispatch(fetchUserCart());
    } catch (e) {
      throw e;
    }
  };

  const count = () => {
    let val: number = -1;
    userItem.map((item) => {
      val += item.count * item.price;
    });
    setTotal(Math.ceil(val));
  };

  useEffect(() => {
    count();
    setLoading({ value: false, context: '' });
  }, [userItem]);

  const handleClick = async () => {
    try {
      const response = await axios.get(`${BackendURL}/api/v1/pay/checkout`, {
        withCredentials: true,
      });
      console.log(response);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading.value ? (
          <Loading height={100} context={`${isLoading.context}`} />
        ) : (
          <motion.section
            {...FRAMER_PAGE_TRANSITION}
            className='h-[93vh] w-full flex justify-center items-center font-context text-dark pt-16'>
            <div className='h-full w-[50%] flex flex-row justify-evenly'>
              <div className='h-full w-[67%]'>
                <div className='h-[10%] w-full flex justify-between items-center'>
                  <div className='h-full w-full font-heading p-3 text-4xl'>
                    My cart
                  </div>
                  {userItem.length > 0 && (
                    <div
                      onClick={handleClearCart}
                      className='flex justify-center items-center text-dark dark:text-mid rounded-lg bg-red-500 h-8 w-28 p-1 cursor-pointer'>
                      Clear-Cart
                    </div>
                  )}
                </div>
                <p className='w-[40%] h-[1px] bg-dark'></p>

                <div className='h-[90%] overflow-y-scroll scrollbar-hide'>
                  {userItem.length > 0 ? (
                    userItem.map((product: any, index) => (
                      <>
                        <AnimatePresence mode='wait'>
                          <motion.div
                            {...FRAMER_CART_ITEM}
                            key={product._id}
                            className='flex justify-between items-center'>
                            <div className='px-2 py-3'>
                              <div className='flex justify-start items-center py-1'>
                                <div className='relative'>
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className='object-cover object-center h-32 w-32'
                                  />
                                </div>
                                <div className='flex flex-col p-2'>
                                  <span>{product.name}</span>
                                  <span>${product.price}</span>
                                </div>
                              </div>
                              <div>Total: ${Math.ceil(product.price * product.count)}</div>
                            </div>
                            <div className='self-start m-4 mr-12'>
                              <button
                                onClick={() => handleRemoveItem(product._id)}
                                className='h-6 w-6'>
                                <img src='garbage.svg' alt='-' />
                              </button>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </>
                    ))
                  ) : (
                    <div>No products available.</div>
                  )}
                  <hr />
                </div>
              </div>

              <div className='h-[35%] w-[33%] flex flex-col justify-evenly self-center text-lg'>
                <h2 className='font-semibold text-xl'>Order summary</h2>
                <p className='w-full h-[1px] bg-dark'></p>
                <div className='flex justify-between'>
                  <span>Subtotal:</span>
                  <span>${total}</span>
                </div>
                <div>
                  <div className='flex justify-between'>
                    <span>Total:</span>
                    <span>${total}</span>
                  </div>
                  <button
                    onClick={handleClick}
                    className='bg-dark text-mid dark:bg-mid dark:text-dark my-5 h-8 w-full rounded-sm'>
                    Cheak Out
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
