import React from 'react';
import type { FormProps } from 'antd';
import { Button, Flex, Form, Input } from 'antd';
import useAuthStore from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import './login.less';
import { LABELS } from '@/constants/labels';
import { MESSAGES } from '@/constants/messages';
import { ConfigRoutes } from '@/constants/page-routes';

type FieldType = {
  email: string;
  password: string;
};

type LoginProps = {
  isLoading: boolean;
};

const Login: React.FC<LoginProps> = ({ isLoading }) => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await login(values.email, values.password);
    navigate(ConfigRoutes.HOME);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <div className='container'>
      <Flex justify='center'>
        <h2>{LABELS.fields.login}</h2>
      </Flex>

      <Form
        name='login'
        layout='vertical'
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='on'
      >
        <Form.Item<FieldType>
          label={LABELS.fields.email}
          name='email'
          rules={[
            { required: true, message: MESSAGES.validation.requiredField },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label={LABELS.fields.password}
          name='password'
          rules={[
            { required: true, message: MESSAGES.validation.requiredField },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type='primary'
            htmlType='submit'
            block
            disabled={isLoading}
          >
            {LABELS.fields.login}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
