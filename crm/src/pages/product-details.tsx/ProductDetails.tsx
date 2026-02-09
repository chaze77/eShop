import React, { useEffect } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SCHEMA } from './productSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getFileUrl, imageUpload } from '@/utils/getFileUrl';
import { useProductData } from './hooks/useProductData';
import { useLocation } from 'react-router-dom';
import ProductForm from './Form';
import './product.less';

interface SelectOption {
  label: string;
  value: string;
}
type FormData = z.infer<typeof SCHEMA>;

const ProductDetails: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SCHEMA),
    mode: 'all',
    defaultValues: {
      attributes: [],
    },
  });

  const upsertWithAttributes = useProductStore(
    (state) => state.upsertWithAttributes,
  );
  const location = useLocation();

  useEffect(() => {
    reset();
  }, [location.key]);

  const { id, product, subCategoriesSelect, brands, colors, sizes } =
    useProductData();

  const categoryOptions: SelectOption[] = subCategoriesSelect.map(
    (category) => ({
      label: category.name,
      value: category.$id,
    }),
  );

  const brandOptions: SelectOption[] = brands.map((brand) => ({
    label: brand.name,
    value: brand.$id,
  }));

  useEffect(() => {
    if (!product || !id) return;
    const { name, price, subCategories, brands, attributes, image, desc } =
      product;

    setValue('name', name);
    setValue('desc', desc);
    setValue('price', price);
    setValue(
      'subCategories',
      typeof subCategories === 'object' ? (subCategories?.$id ?? '') : '',
    );
    setValue('brands', typeof brands === 'object' ? (brands?.$id ?? '') : '');

    if (image) {
      setValue('image', image);
    }

    const formattedAttributes =
      attributes?.map((attr) => {
        if (typeof attr !== 'object') {
          return {
            $id: '',
            quantity: 1,
            colors: '',
            size: '',
          };
        }
        const { $id, quantity, colors, size } = attr;
        return {
          $id,
          quantity,
          colors: typeof colors === 'object' ? colors.$id : (colors ?? ''),
          size: typeof size === 'object' ? size.$id : (size ?? ''),
        };
      }) ?? [];

    setValue('attributes', formattedAttributes);
  }, [product, id, setValue]);

  const addAttribute = () => {
    const currentAttributes = getValues('attributes') || [];
    const newAttribute = {
      quantity: 1,
      colors: '',
      size: '',
    };
    setValue('attributes', [...currentAttributes, newAttribute].slice(0, 5));
  };

  const handleProductCreationOrUpdate = async (data: FormData) => {
    let imageToSave = data.image;

    if (data.image instanceof File) {
      try {
        const fileId = await imageUpload(data.image);
        imageToSave = getFileUrl(fileId);
      } catch (error) {
        console.error(error);
        return;
      }
    }

    return upsertWithAttributes({
      id,
      name: data.name,
      price: data.price,
      subCategories: data?.subCategories ? data?.subCategories : '',
      brands: data.brands ?? '',
      desc: data.desc || '',
      image: imageToSave,
      tags: data?.tags ?? [],
      attributes:
        data.attributes?.map(({ $id, quantity, colors, size }) => ({
          $id,
          quantity,
          colors: colors ?? '',
          size: size ?? '',
        })) ?? [],
    });
  };

  const handleDeleteAttribute = (index: number) => {
    const currentAttributes = getValues('attributes') || [];
    const newAttributes = currentAttributes.filter((_, idx) => idx !== index);
    setValue('attributes', newAttributes);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await handleProductCreationOrUpdate(data);
      reset();
    } catch (error) {
      console.error('Error processing product:', error);
    }
  };

  return (
    <ProductForm
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      categoryOptions={categoryOptions}
      brandOptions={brandOptions}
      colors={colors}
      sizes={sizes}
      addAttribute={addAttribute}
      handleDeleteAttribute={handleDeleteAttribute}
      id={id}
    />
  );
};

export default ProductDetails;
