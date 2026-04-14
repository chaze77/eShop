import { cacheLife } from 'next/cache';
import { fetchDocuments } from '@/lib/apis/api';
import { appwriteKeys } from '@/appwrite/environment';

export interface Banner {
  $id: string;
  imageDesktop: string;
  imageMobile: string;
  title: string;
  subTitle: string;
  textColor: string;
  colorOverlay: string;
}

export async function getBanners(): Promise<Banner[]> {
  'use cache';
  cacheLife('days');

  return await fetchDocuments<Banner>(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.BANNERS_ID,
  );
}
