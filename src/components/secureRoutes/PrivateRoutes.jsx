import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoutes = ({ children }) => {
  const { user, userLoading } = useContext(AuthContext);
  const location = useLocation();
  if (userLoading) {
    return (
      <div className="h-[30vh] w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  return children;
};

export default PrivateRoutes;