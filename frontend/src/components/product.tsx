import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FRAMER_PRODUCT_FADE } from '../util/animation/page';
import { useTypedDispatch } from '../app/hooks';
import { setNotification } from '../features/notificationSlice'
import { addItem, CartState } from '../features/cartSlice';
import axios from 'axios';
import { BackendURL } from '../util/url';

const Product = ({ image, name, price, _id }: any) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handelAdditem = async () => {
    const product: CartState = {
      _id,
      name,
      image,
      price,
      count: 1,
    }

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
        dispatch(addItem(product))
        dispatch(setNotification(`Added ${name}!`, true))
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
        className="bg-secondary font-context rounded-lg border-2 sm:text-base text-sm border-secondary overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      >

        <div className="relative overflow-hidden h-40 sm:h-52 md:h-60 lg:h-80">
          <Link to={`/product/${_id}`}>
            <img
              className="w-full h-full object-cover object-center"
              src={image}
              alt={name}
            />
          </Link>
        </div>

        <div className='flex flex-col justify-evenly items-center py-3 gap-3'>
          <div className='font-normal'>{name}</div>
          <div className='text-background/90'>${price}</div>
        </div>

        <button
          onClick={handelAdditem}
          className={`bg-primary w-full text-secondry md:h-10 h-8 rounded-md`}>
          Add to Cart
        </button>

      </motion.article>
    </>
  );
};

export default Product;
