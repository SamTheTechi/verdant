import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = () => {
  const notifications = useSelector((state: RootState) => state.notifications.notification);

  return (
    <div className="fixed top-12 right-6 z-50 space-y-2 w-72">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0.1, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.1, x: 100 }}
            transition={{ duration: 0.25, type: 'spring' }}
            className={`p-4 rounded-lg shadow-lg tracking-wide text-background font-semibold text-sm ${notification.status ? 'bg-secondary' : 'bg-red-500'
              }`}
          >
            <p>{notification.content}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
