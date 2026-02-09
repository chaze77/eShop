import React from 'react';
import type { FormProps } from 'antd';
import { Button, Flex, Form, Input } from 'antd';
import useAuthStore from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import './login.less';
import { LABELS } from '@/constants/labels';
import { MESSAGES } from '@/constants/messages';

type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await login(values.email, values.password);
    navigate('/');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='container'>
      <Flex
        justify='center'
        className='mb24'
      >
        <h2>{LABELS.fields.login}</h2>
      </Flex>

      <Form
        name='login'
        layout='vertical'
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Email'
          name='email'
          rules={[
            { required: true, message: MESSAGES.validation.requiredField },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
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
          >
            {LABELS.fields.login}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
