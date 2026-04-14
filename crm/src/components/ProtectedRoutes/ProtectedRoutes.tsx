import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import Login from '@/pages/login/Login';

const ProtectedRoutes: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        await fetchUser();
      } catch (error) {
        console.error('Error fetching user session:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      setLoading(true);
      fetchSession();
    } else {
      setLoading(false);
    }
  }, [user, fetchUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Login isLoading={loading} />;
  }

  return <Outlet />; // Если пользователь авторизован, отображаем вложенные маршруты
};

export default ProtectedRoutes;
