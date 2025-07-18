import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FRAMER_PRODUCT_FADE } from '../util/animation/page';
import { useTypedDispatch } from '../app/hooks';
import { setNotification } from '../features/notificationSlice'
import { fetchUserCart } from '../features/cartSlice';
import axios from 'axios';
import { BackendURL } from '../util/url';

const Product = ({ image, name, price, _id }: any) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handelAdditem = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/api/v1/cart/additem`,
        {
          productId: _id,
          count: 1,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(setNotification(`Added ${name}!`, true))
        dispatch(fetchUserCart());
      }
    } catch (_) {
      navigate('/login');
    }
  };

  return (
    <>
      <motion.article
        {...FRAMER_PRODUCT_FADE}
        whileHover={{ scale: 1.01 }}
        className="bg-secondary font-context rounded-lg border-2 border-secondary overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      >

        <div className="relative overflow-hidden h-60 sm:h-72 lg:h-80">
          <Link to={`/product/${_id}`}>
            <img
              className="w-full h-full object-cover object-center"
              src={image}
              alt={name}
            />
          </Link>
        </div>

        <div className='flex flex-col justify-evenly items-center pt-3 min-h-24'>
          <div className='font-normal'>{name}</div>
          <div className='font-light text-dark/70'>${price}</div>
        </div>

        <button
          onClick={handelAdditem}
          className={`bg-primary -translate-x-0.5 -translate-y-1 w-full text-secondry h-10 rounded-sm`}>
          Add to Cart
        </button>

      </motion.article>
    </>
  );
};

export default Product;
