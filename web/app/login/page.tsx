'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/global/store';
import { loginThunk } from '@/global/features/auth-slice';
import Link from 'next/link';
import { Button, Form, Input } from '@nextui-org/react';
import { validateLogin } from '@/lib/validation/login';
import { showToast } from '@/helpers/showMessage';

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status } = useAppSelector((s) => s.auth);
  const [errors, setErrors] = useState({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const errors = validateLogin(data);

    if (Object.keys(errors).length > 0) {
      return setErrors(errors);
    }

    try {
      await dispatch(
        loginThunk({
          email: String(data.email),
          password: String(data.password),
        })
      ).unwrap();
      router.push('/');
      showToast('success', 'Вы успешно авторизовались');
    } catch (e) {
      setErrors({ email: String((e as any)?.message ?? e) });
    }
  };

  return (
    <div className='max-w-md mx-auto p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Вход</h1>
      <Form
        onSubmit={onSubmit}
        className='space-y-4'
        validationErrors={errors}
      >
        <Input
          type='email'
          name='email'
          isRequired
          label='Почта'
          labelPlacement='outside'
          variant='bordered'
          radius='sm'
        />
        <Input
          type='password'
          name='password'
          isRequired
          label='Пароль'
          labelPlacement='outside'
          variant='bordered'
          radius='sm'
        />
        <Button
          type='submit'
          disabled={status === 'pending'}
          className='w-full bg-black text-white py-2 rounded disabled:opacity-60'
        >
          {status === 'pending' ? 'Входим…' : 'Войти'}
        </Button>
      </Form>
      <p className='mt-4 text-sm text-center text-gray-600'>
        Нет аккаунта?{' '}
        <Link
          href='/register'
          className='text-sky-600 hover:text-sky-700 underline'
        >
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
