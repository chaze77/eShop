import { create } from 'zustand';
import { account } from '@/appwrite/config';
import showMessage from '@/utils/showMessage/showMessage';
import { MESSAGES } from '@/contstants/messages';
import { Models } from 'appwrite';

type AuthState = {
  user: Models.User<Models.Preferences> | null;
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

      showMessage('success', MESSAGES.toast.loginSuccess);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      console.error(MESSAGES.toast.authError, error);

      showMessage('error', errorMessage || MESSAGES.toast.authError);
    }
  },

  fetchUser: async () => {
    try {
      const user = await account.get();
      const isAdmin = user.labels?.includes('admin') || false;
      set({ user: user, isAdmin: isAdmin, isAuthenticated: true });
    } catch (error: unknown) {
      console.error(MESSAGES.toast.notAuthorized, error);
      showMessage('error', MESSAGES.toast.notAuthorized);
      set({ user: null, isAdmin: false, isAuthenticated: false });
    }
  },
  logout: async () => {
    try {
      await account.deleteSession('current');
      set({ user: null, isAdmin: false, isAuthenticated: false });
    } catch (error) {
      console.error(MESSAGES.toast.logoutError, error);
      showMessage('error', MESSAGES.toast.logoutError);
    }
  },
}));
export default useAuthStore;
