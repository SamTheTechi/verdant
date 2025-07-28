import { AnimatePresence, motion } from 'framer-motion';
import { useTypedSelector, useTypedDispatch } from '../app/hooks';
import { cartList, removeItem, addItem, CartState, clearCart } from '../features/cartSlice';
import { FRAMER_CART_ITEM } from '../util/animation/cart';
import RazorpayPayment from '../components/razorpay';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';
import { BackendURL } from '../util/url';
import axios from 'axios';
import { setNotification } from '../features/notificationSlice';

const Cart = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate()
  const userItem = useTypedSelector(cartList);
  const [total, setTotal] = useState<number>(0);

  const [showRazorpay, setShowRazorpay] = useState(false);
  const [razorpayOrderId, setRazorpayOrderId] = useState('');
  const [razorpayAmount, setRazorpayAmount] = useState(0);

  const [isLoading, setLoading] = useState<{ value: boolean; context: string }>({
    value: true,
    context: 'Loading',
  });

  const handleRemoveItem = async (product: CartState) => {
    const productId = product._id;
    dispatch(removeItem(product));

    // here we're just hoping backend call to succeed
    try {
      await axios.patch(
        `${BackendURL}/api/v1/cart/clearitem`,
        { productId },
        { withCredentials: true }
      );
      dispatch(setNotification("Item Removed!", true));
    } catch (e) {
      dispatch(setNotification("Error Removing!", false));
      dispatch(addItem(product));
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`${BackendURL}/api/v1/cart/clearcart`, {
        withCredentials: true,
      });
      dispatch(clearCart());
      dispatch(setNotification("Cart Cleared!", true));
    } catch (e) {
      dispatch(setNotification("Opps Error!", false));
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
    <section className='w-full h-[100vh] flex justify-center flex-col text-text pt-[4.5rem] bg-background pb-12'>
      <AnimatePresence mode='wait'>
        {isLoading.value ? (
          <Loading height={100} context={`${isLoading.context}`} />
        ) : (
          <motion.div
            className='w-full flex flex-col md:flex-row relative flex-1'>

            {/* Left Section - Cart Items */}
            <div className='w-full flex flex-col h-full md:w-3/5 md:shrink-[2] lg:shrink-[1]'>

              <div className='w-full flex justify-end my-2 px-3'>
                <button
                  onClick={handleClearCart}
                  className='text-sm md:text-base flex justify-center items-center rounded-lg bg-red-400 h-8 w-24 md:w-28 p-1 cursor-pointer'>
                  Clear-Cart
                </button>
              </div>

              {/* Scrollable Cart Area */}
              <div className='h-[55vh] md:h-[65vh] lg:h-[75vh] min-h-96 overflow-y-scroll border-white/10 md:border-2 p-4 mt-2 rounded-2xl'>
                {userItem.map((product: any) => (
                  <motion.div {...FRAMER_CART_ITEM} key={product._id} className='flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-700 last:border-b-0'>
                    <div className='flex items-center gap-3 mb-2 sm:mb-0'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='object-cover object-center h-24 w-24 md:h-28 md:w-28 rounded-md'
                      />
                      <div className='flex flex-col'>
                        <span className='text-base md:text-lg font-medium'>{product.name}</span>
                        <span className='text-sm md:text-base text-gray-400'>${product.price}</span>
                        <span className='text-sm md:text-base mt-1'>Quantity: {product.count}</span>
                      </div>
                    </div>
                    <div className='flex items-center gap-4 self-end sm:self-center'>
                      <div className='font-semibold text-lg'>Total: ${Math.ceil(product.price * product.count)}</div>
                      <button onClick={() => handleRemoveItem(product)} className='h-8 w-8 bg-red-600 rounded-full flex items-center justify-center p-1 text-white hover:bg-red-700 transition-colors'>
                        <img src='/garbage.svg' alt='Remove' className='h-4 w-4' />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className='w-full md:w-2/5 md:shrink-[0] flex justify-center items-center '>

              <div className='w-full sm:w-[75%] bottom-0 px-6 py-4 rounded-xl md:shadow-[#363d3f] shadow-2xl'>
                <h2 className='font-semibold text-xl md:text-2xl mb-4'>Order summary</h2>
                <hr className='my-2 md:my-4 border-gray-600' />

                <div className='flex justify-between text-base md:text-lg mb-2'>
                  <span>Subtotal:</span>
                  <span>${total}</span>
                </div>

                <div className='flex justify-between font-bold text-lg md:text-xl mt-4'>
                  <span>Total:</span>
                  <span>${total}</span>
                </div>

                <div className='mt-6'>
                  <button
                    onClick={handleClick}
                    className='bg-primary rounded-xl text-base text-background font-medium h-12 w-full hover:bg-opacity-90 transition-opacity'>
                    Check Out
                  </button>
                </div>

                {showRazorpay && (
                  <RazorpayPayment
                    order_id={razorpayOrderId}
                    amount={razorpayAmount}
                    onSuccess={() => {
                      setShowRazorpay(false);
                      handleClearCart();
                      navigate('/greet');
                      dispatch(setNotification("Transaction Completed", true, 5000));
                    }}
                    onFailure={() => {
                      dispatch(setNotification("Transaction Failed", false, 5000));
                      setShowRazorpay(false);
                    }}
                  />
                )}
              </div>
            </div>          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Cart;
