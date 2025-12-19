export type LoginErrors = {
  email?: string;
  password?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(data: {
  email?: FormDataEntryValue;
  password?: FormDataEntryValue;
}): LoginErrors {
  const errors: LoginErrors = {};

  const email = String(data.email ?? '').trim();
  const password = String(data.password ?? '');

  if (!email) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
}
