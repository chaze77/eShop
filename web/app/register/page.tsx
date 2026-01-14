'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/global/store';
import { registerThunk } from '@/global/features/auth-slice';
import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import { showToast } from '@/helpers/showMessage';
import Container from '@/common/components/ui/Container/Container';
import { ToastTypes } from '@/constants/toastTypes';

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error } = useAppSelector((s) => s.auth);
  const [form] = Form.useForm();

  const onSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await dispatch(
        registerThunk({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      ).unwrap();

      showToast(ToastTypes.SUCCESS, 'Your account has been created');
      router.push('/');
    } catch (e) {
      const message = String((e as any)?.message ?? e);
      form.setFields([{ name: 'email', errors: [message] }]);
    }
  };

  return (
    <Container>
      <h1 className='auth-page__title'>Create Account</h1>

      <Form
        form={form}
        layout='vertical'
        onFinish={onSubmit}
        className='auth-page__form'
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder='Your name' />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Invalid email address' },
          ]}
        >
          <Input placeholder='Enter your email' />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters' },
          ]}
        >
          <Input.Password placeholder='Create a password' />
        </Form.Item>

        {error && <div className='auth-page__error'>{error}</div>}

        <Button
          type='primary'
          htmlType='submit'
          block
          disabled={status === 'pending'}
        >
          {status === 'pending' ? 'Creating account…' : 'Sign Up'}
        </Button>
      </Form>

      <p className='auth-page__footer'>
        Already have an account?{' '}
        <Link
          href='/login'
          className='auth-page__link'
        >
          Sign in
        </Link>
      </p>
    </Container>
  );
}
