// validation.ts

export const validateName = (name: string): string | null => {
  if (name.trim() === '') {
    return 'Название  не может быть пустым';
  }
  if (name.length < 3) {
    return 'Название должно быть не менее 3 символов';
  }
  return null;
};
