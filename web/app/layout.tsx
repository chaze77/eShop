import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AntdRegistry } from '@ant-design/nextjs-registry';

import { UIProvider } from '@/provider/AntProvider';
import { ReduxProvider } from '@/global/provider';
import { ToastContainer } from 'react-toastify';

import AntHeader from '@/common/components/header/Header';
import { ICategory } from '@/common/types';
import { fetchDocuments } from '@/lib/apis/api';
import { appwriteKeys } from '@/appwrite/environment';

import { labels } from '@/constants/labels';

import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import './styles/globals.css';
import AppFooter from '@/common/components/footer/Footer';

export const metadata: Metadata = {
  title: 'iShop',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: ICategory[] = [];

  try {
    categories = await fetchDocuments<ICategory>(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.CATEGORIES_COLLECTION_ID,
    );
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error);
  }

  return (
    <html lang='ru'>
      <body>
        <AntdRegistry>
          <ReduxProvider>
            <UIProvider>
              <ToastContainer />

              <div className='app-shell'>
                <Suspense fallback={<div>{labels.common.loading}</div>}>
                  <AntHeader categories={categories} />
                </Suspense>

                <main className='app-main'>{children}</main>

                <Suspense fallback={<div>{labels.common.loading}</div>}>
                  <AppFooter categories={categories} />
                </Suspense>
              </div>
            </UIProvider>
          </ReduxProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
