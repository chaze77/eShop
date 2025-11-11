'use client';
import { toast, type ToastOptions } from 'react-toastify';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export const showToast = (type: ToastType, message: string) => {
  toast[type](message, {
    position: 'top-right',
  });
};
