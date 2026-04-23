import { fetchDocuments } from '@/lib/apis/api';
import { appwriteKeys } from '@/appwrite/environment';
import { Query } from 'appwrite';

export interface Banner {
  $id: string;
  imageDesktop: string;
  imageMobile: string;
  title: string;
  subTitle: string;
  textColor: string;
  colorOverlay: string;
  active: boolean;
}

export async function getBanners(): Promise<Banner[]> {
  const query = [Query.equal('active', true)];

  return await fetchDocuments<Banner>(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.BANNERS_ID,
    query,
  );
}
