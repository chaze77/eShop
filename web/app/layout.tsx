import type { Metadata } from 'next';
import { Suspense } from 'react';
import { cacheLife } from 'next/cache';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import { UIProvider } from '@/provider/AntProvider';
import { ReduxProvider } from '@/global/provider';
import { ToastContainer } from 'react-toastify';

import AntHeader from '@/common/components/header/Header';
import { ICategory } from '@/common/types';
import { fetchDocuments } from '@/lib/apis/api';
import { appwriteKeys } from '@/appwrite/environment';
import SearchWatcher from '@/common/components/header/search-watcher/SearchWatcher';
import AppFooter from '@/common/components/footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'iShop',
};

async function getCategories(): Promise<ICategory[]> {
  'use cache';
  cacheLife('days');

  try {
    return await fetchDocuments<ICategory>(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.CATEGORIES_COLLECTION_ID,
    );
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang='ru'>
      <body>
        <AntdRegistry>
          <ReduxProvider>
            <UIProvider>
              <ToastContainer />
              <div className='app-shell'>
                <Suspense fallback={null}>
                  <SearchWatcher />
                </Suspense>
                <AntHeader categories={categories} />
                <main className='app-main'>{children}</main>
                <AppFooter categories={categories} />
              </div>
            </UIProvider>
          </ReduxProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
