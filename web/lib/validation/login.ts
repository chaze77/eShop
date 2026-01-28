import { labels } from '@/constants/labels';

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
    errors.email = labels.validation.emailRequired;
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = labels.validation.emailInvalid;
  }

  if (!password) {
    errors.password = labels.validation.passwordRequired;
  } else if (password.length < 8) {
    errors.password = labels.validation.passwordMin6;
  }

  return errors;
}
