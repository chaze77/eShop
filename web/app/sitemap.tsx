import type { MetadataRoute } from 'next';
import type { IBlog, ICategory, IProduct } from '@/common/types';
import { fetchDocuments } from '@/lib/apis/api';
import { appwriteKeys } from '@/appwrite/environment';

/**
 * Определяем базовый URL сайта
 * - localhost в dev
 * - NEXT_PUBLIC_SITE_URL если задан
 * - VERCEL_URL как fallback на Vercel
 */
export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const baseUrl = getBaseUrl();

  let categories: ICategory[] = [];
  let products: IProduct[] = [];
  let blogs: IBlog[] = [];

  try {
    [categories, products, blogs] = await Promise.all([
      fetchDocuments<ICategory>(
        appwriteKeys.DATABASE_ID,
        appwriteKeys.CATEGORIES_COLLECTION_ID,
      ),
      fetchDocuments<IProduct>(
        appwriteKeys.DATABASE_ID,
        appwriteKeys.PRODUCTS_COLLECTION_ID,
      ),
      fetchDocuments<IBlog>(appwriteKeys.DATABASE_ID, appwriteKeys.BLOG_ID),
    ]);
  } catch (error) {
    // Если Appwrite недоступен — sitemap будет только со статикой
    console.error('Sitemap fetch error:', error);
  }

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  const categoryEntries = categories.map<MetadataRoute.Sitemap[number]>(
    (c) => ({
      url: `${baseUrl}/category/${encodeURIComponent(c.$id)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }),
  );

  const productEntries = products.map<MetadataRoute.Sitemap[number]>((p) => ({
    url: `${baseUrl}/product/${encodeURIComponent(p.$id)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogEntries = blogs.map<MetadataRoute.Sitemap[number]>((b) => ({
    url: `${baseUrl}/blog/${encodeURIComponent(b.$id)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...productEntries,
    ...blogEntries,
  ];
}
