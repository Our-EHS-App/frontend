import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { FC } from 'react';
import { useSurveyForm } from '@services/surveyService';
import { useMutation } from '@tanstack/react-query';
import { t } from 'i18next';
import { handleErrorNotifications } from '../../helpers/errorHandler';
import { useNavigate } from 'react-router-dom';

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  const { login } = useSurveyForm();
  const { mutate } = useMutation(login, {
    onError: (error) => {
      handleErrorNotifications(error as any);
    },
    onSuccess: (data) => {
      notification.success({
        message: 'success',
        duration: 1.5,
      });
      localStorage.setItem('token', data?.id_token);
      navigate(`/form-list`);
    },
  });
  const onFinish = (values: any) => {
    const body: any = {
      ...values,
    };
    mutate(body);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#F6F2ED',
      }}>
      <Form name='login-form' onFinish={onFinish} style={{ width: 300 }}>
        <div className='text-lg text-center pb-5'>{'Welcome'}</div>
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please enter your username!' }]}>
          <Input placeholder='Username' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please enter your password!' }]}>
          <Input.Password placeholder='Password' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
