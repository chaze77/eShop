import { MESSAGES } from '@/contstants/messages';

export const validateName = (name: string): string | null => {
  if (name.trim() === '') {
    return MESSAGES.validation.emptyName;
  }
  if (name.length < 3) {
    return MESSAGES.validation.nameMin;
  }
  return null;
};
