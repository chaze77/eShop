// app/(private)/account/password/page.tsx
import { Suspense } from 'react';
import PasswordPage from './PasswordPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PasswordPage />
    </Suspense>
  );
}
