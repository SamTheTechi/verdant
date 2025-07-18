import './Tailwind.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTypedDispatch } from './app/hooks';
import { useEffect, useState } from 'react';
import { initialize } from './features/userSlice';
import axios from 'axios';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import LogOut from './pages/logout';
import Signup from './pages/signup';
import Product from './pages/product';
import Cart from './pages/cart';
import Notification from './components/notification.tsx'
import { BackendURL } from './util/url';

const App = () => {
  const dispatch = useTypedDispatch();
  const { pathname } = useLocation();
  const [userLogin, setUserLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cheakUserLogin = async () => {
      try {
        const response = await axios.get(`${BackendURL}/api/v1/auth/islogin`, {
          withCredentials: true,
        });
        setUserLogin(response.data.value);
        console.log(response.data.value)
      } catch (e) {
        setUserLogin(false);
      } finally {
        setLoading(false);
      }
    };
    cheakUserLogin();
  }, []);

  useEffect(() => {
    dispatch(
      initialize({
        userLogin,
      })
    );
  }, [userLogin, useLocation]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-primary">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-background">
      <Notification />
      <Routes>
        <Route
          path={'/'}
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/logout'} element={<LogOut />} />
        <Route
          path={`product/:${pathname.split('/')[2]}`}
          element={
            <>
              <Navbar />
              <Product />
            </>
          }
        />
        <Route
          path={'/cart'}
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
