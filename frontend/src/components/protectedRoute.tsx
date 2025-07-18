import { ReactNode } from 'react';
import { useTypedSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = useTypedSelector((state: RootState) => state.logger.userLogin);

  return isAuth ? children : <Navigate to={'/'} replace />;
}


export default ProtectedRoute;
