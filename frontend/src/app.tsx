import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import Product from './pages/product';
import Cheakout from './pages/cheakout';
import NotFound from './pages/notfound';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/Signup'} element={<Signup />} />
        <Route path={'/Login'} element={<Login />} />
        <Route path={'/Product'} element={<Product />} />
        <Route path={'/Cheakout'} element={<Cheakout />} />
        <Route path={'/NotFound'} element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
