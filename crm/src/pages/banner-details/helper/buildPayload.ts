import { deleteFile, getFileUrl, imageUpload } from '@/utils/getFileUrl';

type UploadableImage = string | File;

type BannerFormValues = {
  title: string;
  subTitle?: string;

  imageDesktop: UploadableImage;
  imageMobile: UploadableImage;

  textColor: string;
  colorOverlay: string;
};

const uploadIfNeeded = async (img: UploadableImage): Promise<string> => {
  console.log('Значение изображения:', img);
  console.log('Тип значения изображения:', typeof img);
  if (typeof img === 'string') return img;
  const fileId = await imageUpload(img);
  return getFileUrl(fileId);
};

const extractFileIdFromUrl = (url: string): string | null => {
  const match = url.match(/\/files\/([^/]+)\//);
  return match?.[1] ?? null;
};

export const buildBannerPayload = async (
  values: BannerFormValues,
  mode: 'create' | 'update',
) => {
  let imageDesktop = values.imageDesktop;
  let imageMobile = values.imageMobile;

  // удаление desktop
  if (mode === 'update' && values.imageDesktop === null) {
    if (typeof values.imageDesktop === 'string') {
      const fileId = extractFileIdFromUrl(values.imageDesktop);
      if (fileId) {
        await deleteFile(fileId);
      }
    }

    imageDesktop = '';
  } else {
    imageDesktop = await uploadIfNeeded(values.imageDesktop);
  }

  // удаление mobile
  if (mode === 'update' && values.imageMobile === null) {
    console.log(imageMobile, 'payload');
    if (typeof values.imageMobile === 'string') {
      const fileId = extractFileIdFromUrl(values.imageMobile);
      if (fileId) {
        await deleteFile(fileId);
      }
    }

    imageMobile = '';
  } else {
    imageMobile = await uploadIfNeeded(values.imageMobile);
  }

  return {
    ...values,
    imageDesktop,
    imageMobile,
  };
};
