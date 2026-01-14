export const PageConfig = {
  HOME: '/',
  CART: '/cart',
  FAVORITE: '/favorites',
  LOGIN: '/login',
  REGISTER: '/register',
  BLOG: '/blog',
  CATEGORY: (id: string) => `/category/${id}`,
  PRODUCT: (id: string) => `/product/${id}`,
} as const;

export type PagePath = (typeof PageConfig)[keyof typeof PageConfig];
