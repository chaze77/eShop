import { account } from '@/appwrite/config';
import { ID } from 'appwrite';

export const fetchUser = async () => {
  let user;
  try {
    user = await account.get();
  } catch (error: unknown) {
    console.error('Пользователь не авторизован:', error);
  }
  return user;
};

export const signIn = async (
  email: string,
  password: string
): Promise<any | null> => {
  try {
    const user = await fetchUser();
    if (user) {
      await logout();
    }
    const response = await account.createEmailPasswordSession(email, password);
    return response;
  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
    return null;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
};

export const registerAccount = async (
  email: string,
  password: string,
  accountName: string
) => {
  try {
    const user = await account.create(
      ID.unique(),
      email,
      password,
      accountName
    );
    console.log('User registered successfully:', user);
  } catch (error) {
    console.error('Error registering user:', error);
  }
};
