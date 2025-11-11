'use client';

import { ID, type Models } from 'appwrite';
import { account } from '@/appwrite/config';

export type AuthUser = Models.User<Models.Preferences>;

export async function registerUser(params: {
  email: string;
  password: string;
  name?: string;
}): Promise<AuthUser> {
  const { email, password, name } = params;
  // Create account, then create session and return current user
  await account.create(ID.unique(), email, password, name ?? undefined);

  await account.createEmailPasswordSession(email, password);
  const user = await account.get();
  return user as AuthUser;
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthUser> {
  await account.createEmailPasswordSession(email, password);
  const user = await account.get();
  return user as AuthUser;
}

export async function logoutUser(): Promise<void> {
  await account.deleteSession('current');
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const user = await account.get();
    return user as AuthUser;
  } catch {
    return null;
  }
}
