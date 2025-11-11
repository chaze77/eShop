'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/global/store';
import { loginThunk } from '@/global/features/auth-slice';
import Link from 'next/link';

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginThunk({ email, password })).unwrap();
      router.push('/');
    } catch (err) {
      // error handled in slice state
      console.error('[login] failed', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Вход</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        <button
          type="submit"
          disabled={status === 'pending'}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-60"
        >
          {status === 'pending' ? 'Входим…' : 'Войти'}
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Нет аккаунта?{' '}
        <Link href="/register" className="text-sky-600 hover:text-sky-700 underline">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
