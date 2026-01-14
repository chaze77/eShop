'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/global/store';
import { loginThunk } from '@/global/features/auth-slice';
import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import { validateLogin } from '@/lib/validation/login';
import { showToast } from '@/helpers/showMessage';
import './login.scss';
import { ToastTypes } from '@/constants/toastTypes';

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status } = useAppSelector((s) => s.auth);
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (values: Record<string, string>) => {
    const validation = validateLogin(values);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      form.setFields(
        Object.entries(validation).map(([name, error]) => ({
          name,
          errors: [error],
        }))
      );
      return;
    }

    try {
      await dispatch(
        loginThunk({
          email: String(values.email),
          password: String(values.password),
        })
      ).unwrap();

      router.push('/');
      showToast(ToastTypes.SUCCESS, 'You have successfully signed in');
    } catch (e) {
      const message = String((e as any)?.message ?? e);
      setErrors({ email: message });
      form.setFields([{ name: 'email', errors: [message] }]);
    }
  };

  return (
    <div className='auth-page'>
      <h1 className='auth-page__title'>Sign In</h1>

      <Form
        form={form}
        layout='vertical'
        onFinish={onSubmit}
        className='auth-page__form'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: errors.email }]}
        >
          <Input placeholder='Enter your email' />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: errors.password }]}
        >
          <Input.Password placeholder='Enter your password' />
        </Form.Item>

        <Button
          type='primary'
          htmlType='submit'
          block
          disabled={status === 'pending'}
        >
          {status === 'pending' ? 'Signing in…' : 'Sign In'}
        </Button>
      </Form>

      <p className='auth-page__footer'>
        Don’t have an account?{' '}
        <Link
          href='/register'
          className='auth-page__link'
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
