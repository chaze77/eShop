import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import Login from '@/pages/login/Login';

const ProtectedRoutes: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        await fetchUser(); // Загружаем пользователя
      } catch (error) {
        console.error('Error fetching user session:', error);
      } finally {
        setLoading(false); // Сбрасываем состояние загрузки
      }
    };

    if (!user) {
      fetchSession();
    } else {
      setLoading(false); // Если пользователь уже есть, завершить загрузку
    }
  }, [user, fetchUser]);

  if (loading) {
    return <p>Loading...</p>; // Индикатор загрузки
  }

  if (!user) {
    return <Login />; // Показываем компонент Login вместо Navigate
  }

  return <Outlet />; // Если пользователь авторизован, отображаем вложенные маршруты
};

export default ProtectedRoutes;
