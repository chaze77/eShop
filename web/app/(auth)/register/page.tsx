'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/global/store';
import { registerThunk } from '@/global/features/auth-slice';
import Link from 'next/link';
import { Button, Form, Input, message } from 'antd';
import { showToast } from '@/helpers/showMessage';
import { ToastTypes } from '@/constants/toastTypes';
import { messages } from '@/constants/messages';
import { labels } from '@/constants/labels';
import './register.css';

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
        }),
      ).unwrap();

      showToast(ToastTypes.SUCCESS, messages.auth.register.success);
      router.push('/');
    } catch (e) {
      const message = String((e as any)?.message ?? e);
      form.setFields([{ name: 'email', errors: [message] }]);
    }
  };

  return (
    <div className='auth-page'>
      <h1 className='auth-page__title'>{labels.common.createOne}</h1>

      <Form
        form={form}
        layout='vertical'
        onFinish={onSubmit}
        className='auth-page__form'
      >
        <Form.Item
          label={labels.fields.name}
          name='name'
          rules={[{ required: true, message: labels.validation.nameRequired }]}
        >
          <Input placeholder={labels.placeholders.name} />
        </Form.Item>

        <Form.Item
          label={labels.fields.email}
          name='email'
          rules={[
            { required: true, message: labels.validation.emailRequired },
            { type: 'email', message: labels.validation.emailInvalid },
          ]}
        >
          <Input placeholder={labels.placeholders.email} />
        </Form.Item>

        <Form.Item
          label={labels.fields.password}
          name='password'
          rules={[
            { required: true, message: labels.validation.passwordRequired },
            { min: 6, message: labels.validation.passwordMin6 },
          ]}
        >
          <Input.Password placeholder={labels.placeholders.password} />
        </Form.Item>

        {error && <div className='auth-page__error'>{error}</div>}

        <Button
          type='primary'
          htmlType='submit'
          block
          disabled={status === 'pending'}
        >
          {status === 'pending'
            ? labels.auth.creatingAccount
            : labels.common.createOne}
        </Button>
      </Form>

      <p className='auth-page__footer'>
        {labels.hints.auth.haveRegister}
        <Link
          href='/login'
          className='auth-page__link'
        >
          {labels.auth.login}
        </Link>
      </p>
    </div>
  );
}
