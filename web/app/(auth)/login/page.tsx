'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/global/store';
import { loginThunk } from '@/global/features/auth-slice';
import { Button, Form, Input } from 'antd';
import { validateLogin } from '@/lib/validation/login';
import { showToast } from '@/helpers/showMessage';
import { ToastTypes } from '@/constants/toastTypes';
import { messages } from '@/constants/messages';
import { labels } from '@/constants/labels';
import './login.css';

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
        })),
      );
      return;
    }

    try {
      await dispatch(
        loginThunk({
          email: String(values.email),
          password: String(values.password),
        }),
      ).unwrap();

      router.push('/');
      showToast(ToastTypes.SUCCESS, messages.auth.login.success);
    } catch (e) {
      const message = String((e as any)?.message ?? e);
      setErrors({ email: message });
      form.setFields([{ name: 'email', errors: [message] }]);
    }
  };

  return (
    <div className='auth-page'>
      <h1 className='auth-page__title'>{labels.auth.login}</h1>

      <Form
        form={form}
        layout='vertical'
        onFinish={onSubmit}
        className='auth-page__form'
      >
        <Form.Item
          label={labels.fields.email}
          name='email'
          rules={[{ required: true, message: errors.email }]}
        >
          <Input placeholder={labels.placeholders.email} />
        </Form.Item>

        <Form.Item
          label={labels.fields.password}
          name='password'
          rules={[{ required: true, message: errors.password }]}
        >
          <Input.Password placeholder={labels.placeholders.password} />
        </Form.Item>

        <Button
          type='primary'
          htmlType='submit'
          block
          disabled={status === 'pending'}
        >
          {status === 'pending' ? labels.common.updated : labels.auth.login}
        </Button>
      </Form>

      <p className='auth-page__footer'>
        {labels.hints.auth.haveLogin}
        <Link
          href='/register'
          className='auth-page__link'
        >
          {labels.common.createOne}
        </Link>
      </p>
    </div>
  );
}
