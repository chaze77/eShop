import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

const PublicRoutes: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoutes;
