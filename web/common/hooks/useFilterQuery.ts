'use client';

import { useMemo, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FilterKey } from '@/app/category/types'; // <-- поправь путь под себя

type SelectedFilters = Record<FilterKey, string[]>;

function buildUrl(pathname: string, params: URLSearchParams) {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function useFilterQuery() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selected = useMemo(() => {
    const getAll = (key: FilterKey) => searchParams.getAll(key);

    return {
      subCategories: getAll('subCategories'),
      brands: getAll('brands'),
      sizes: getAll('sizes'),
      colors: getAll('colors'),
    } as SelectedFilters;
  }, [searchParams]);

  const toggleFilter = useCallback(
    (key: FilterKey, value: string) => {
      const next = new URLSearchParams(searchParams);

      const currentValues = next.getAll(key);
      const set = new Set(currentValues);

      if (set.has(value)) set.delete(value);
      else set.add(value);

      next.delete(key);

      [...set].sort().forEach((v) => next.append(key, v));

      router.replace(buildUrl(pathname, next), { scroll: false });
    },
    [searchParams, pathname, router],
  );

  // на будущее: удобно для "reset", "set all", "replace subCategories" и т.д.
  const replaceMany = useCallback(
    (patch: Partial<SelectedFilters>) => {
      const next = new URLSearchParams(searchParams);

      (Object.keys(patch) as FilterKey[]).forEach((key) => {
        next.delete(key);
        const values = patch[key] ?? [];
        [...values].sort().forEach((v) => next.append(key, v));
      });

      router.replace(buildUrl(pathname, next), { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const reset = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    selected,
    queryString: searchParams.toString(),
    toggleFilter,
    replaceMany,
    reset,
  };
}
