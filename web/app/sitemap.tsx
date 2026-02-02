import type { MetadataRoute } from 'next';
import type { IBlog, ICategory, IProduct } from '@/common/types';
import { fetchDocuments } from '@/lib/apis/api';
import { appwriteKeys } from '@/appwrite/environment';

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  }
  // VERCEL_URL does not include https://, so it must be added manually
  return `https://${process.env.VERCEL_URL}`;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

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
  } catch {
    // If fetch fails, keep static routes only.
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
