'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/global/store';
import { fetchProductsByName } from '@/global/features/products-slice';

export default function SearchWatcher() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const q = searchParams.get('q') ?? '';

  useEffect(() => {
    if (q.trim().length > 0) {
      dispatch(fetchProductsByName(q));
    }
  }, [q]);

  return null;
}
