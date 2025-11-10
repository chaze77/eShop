'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/ui/Container';
import { Button, Form, Input } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/global/store';
import { registerThunk, signInThunk } from '@/global/features/auth-slice';
import { useRouter } from 'next/navigation';
import { fetchUser } from '@/common/lib/auth';

export default function Page() {
  const [currentUser, setCurrentuser] = useState<any>(null);

  useEffect(() => {
    async function checkUser() {
      const res = await fetchUser();
      setCurrentuser(res);
    }
    checkUser();
  }, []);

  console.log('currentUser', currentUser);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error, user } = useAppSelector((s) => s.auth);

  console.log('user', user);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get('email') ?? '').trim();
    const password = String(data.get('password') ?? '').trim();
    const accountName = String(data.get('name') ?? '').trim();

    console.log(data);

    try {
      await dispatch(registerThunk({ email, password, accountName })).unwrap();
      await dispatch(signInThunk({ email, password })).unwrap();
      router.replace('/');
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  return (
    <Container className='min-h-screen flex items-center justify-center text-center'>
      <Form
        className='w-full max-w-xs flex flex-col gap-4'
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          label='Email'
          labelPlacement='outside'
          name='email'
          placeholder='Enter your email'
          type='email'
        />
        <Input
          isRequired
          label='Password'
          labelPlacement='outside'
          name='password'
          placeholder='Enter your password'
          type='password'
        />
        <Input
          isRequired
          label='Name'
          labelPlacement='outside'
          name='name'
          placeholder='Enter your name'
          type='text'
        />

        <div className='flex gap-2'>
          <Button
            color='primary'
            type='submit'
            isLoading={status === 'pending'}
          >
            Sign up
          </Button>
          <Button
            type='reset'
            variant='flat'
            isDisabled={status === 'pending'}
          >
            Reset
          </Button>
        </div>

        {error && <div className='text-small text-danger-500'>{error}</div>}
      </Form>
    </Container>
  );
}
