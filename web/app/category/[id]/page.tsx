import { Suspense } from 'react';
import CategoryClient from './CategoryClient';
import LoaderOverlay from '@/common/components/ui/LoaderOverlay';

export default function CategoryPage() {
  return (
    <Suspense fallback={<LoaderOverlay show />}>
      <CategoryClient />
    </Suspense>
  );
}
