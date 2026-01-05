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
      showToast('success', "D'¥< ¥Ÿ¥?D¨Dæ¥^D«D_ DøDý¥,D_¥?D,DúD_DýDøD¯D,¥?¥O");
    } catch (e) {
      const message = String((e as any)?.message ?? e);
      setErrors({ email: message });
      form.setFields([{ name: 'email', errors: [message] }]);
    }
  };

  return (
    <div className='auth-page'>
      <h1 className='auth-page__title'>D'¥.D_D'</h1>
      <Form
        form={form}
        layout='vertical'
        onFinish={onSubmit}
        className='auth-page__form'
      >
        <Form.Item
          label='DYD_¥Ø¥,Dø'
          name='email'
          rules={[{ required: true, message: errors.email }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='DYDø¥?D_D¯¥O'
          name='password'
          rules={[{ required: true, message: errors.password }]}
        >
          <Input.Password />
        </Form.Item>

        <Button
          type='primary'
          htmlType='submit'
          block
          disabled={status === 'pending'}
        >
          {status === 'pending' ? "D'¥.D_D'D,D¬ƒ?Ý" : "D'D_D1¥,D,"}
        </Button>
      </Form>
      <p className='auth-page__footer'>
        D?Dæ¥, DøD§D§Dø¥ŸD«¥,Dø?{' '}
        <Link
          href='/register'
          className='auth-page__link'
        >
          D-Dø¥?DæD3D,¥?¥,¥?D,¥?D_DýDø¥,¥O¥?¥?
        </Link>
      </p>
    </div>
  );
}
