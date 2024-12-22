import { create } from 'zustand';
import { account } from '@/appwrite/config';
import showMessage from '@/utils/showMessage/showMessage';

type AuthState = {
  user: any | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);

      await useAuthStore.getState().fetchUser();

      showMessage('success', 'Success login');
    } catch (error: unknown) {
      // Преобразуем ошибку в строку для showMessage
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Логируем объект ошибки для отладки
      console.error('Ошибка авторизации:', error);

      // Показываем уведомление пользователю
      showMessage('error', errorMessage);
    }
  },

  fetchUser: async () => {
    try {
      const user = await account.get();
      const isAdmin = user.labels?.includes('admin') || false;
      set({ user: user, isAdmin: isAdmin, isAuthenticated: true });
    } catch (error: unknown) {
      console.error('Пользователь не авторизован:', error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      showMessage('error', errorMessage as string);
      set({ user: null, isAdmin: false, isAuthenticated: false });
    }
  },
  logout: async () => {
    try {
      await account.deleteSession('current');
      set({ user: null, isAdmin: false, isAuthenticated: false });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  },
}));
export default useAuthStore;
