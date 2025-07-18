import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const useScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    window.scroll(0, 0);
  }, [pathname]);
  return null;
};
