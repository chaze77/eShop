import React, { useEffect } from 'react';
import { Form, Select, Input, Button, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SCHEMA } from './productSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IDirectory } from '@/types';
import useColorStore from '@/store/useColorStore';
import useSizeStore from '@/store/useSizeStore';
import useBrandStore from '@store/useBrandStore';
import useSubCategoryStore from '@/store/useSubCategoryStore';
import { create } from 'zustand';
import { createDocument, updateDocument } from '@/utils/apiClient/apiClient';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID_ATTR = import.meta.env.VITE_ATTRIBUTES_COLLECTION_ID;
const COLLECTION_ID_PRODUCT = import.meta.env.VITE_PRODUCTS_COLLECTION_ID;

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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SCHEMA),
    mode: 'all',
  });

  const { id } = useParams();
  const subCategories = useSubCategoryStore((state) => state.subCategories);
  const brands = useBrandStore((state) => state.items);
  const product = useProductStore((state) => state.product);
  const colors = useColorStore((state) => state.items);
  const sizes = useSizeStore((state) => state.items);

  const fetchSubCategories = useSubCategoryStore(
    (state) => state.fetchSubCategories
  );
  const fetchBrands = useBrandStore((state) => state.fetchItems);
  const fetchColors = useColorStore((state) => state.fetchItems);
  const fetchSizes = useSizeStore((state) => state.fetchItems);

  const getById = useProductStore((state) => state.fetchProductById);
  const createProduct = useProductStore((state) => state.create);

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  useEffect(() => {
    if (subCategories.length === 0) fetchSubCategories();
    if (brands.length === 0) fetchBrands();
    if (colors.length === 0) fetchColors();
    if (sizes.length === 0) fetchSizes();
  }, []);

  console.log('product:', product);

  useEffect(() => {
    if (product && product.name) {
      setValue('name', product.name);
      setValue('price', product.price);

      // Извлекаем единственный ID subCategory
      const subCategoryId = product.subCategories?.[0]?.$id || '';
      console.log('Extracted subCategory ID:', subCategoryId);
      setValue('subCategories', subCategoryId);

      // Извлекаем единственный ID бренда
      const brandId = product.brands?.$id || '';
      console.log('Extracted brand ID:', brandId);
      setValue('brands', brandId);

      // Извлекаем атрибуты, приводя colors и size к **одному ID**
      const formattedAttributes = product.attributes.map((attr) => ({
        $id: attr.$id, // ID самого атрибута
        quantity: attr.quantity,
        colors: attr.colors?.[0]?.$id || '', // Одиночный ID
        size: attr.size?.[0]?.$id || '', // Одиночный ID
        products: product.$id, // ❗ Добавляем связь с продуктом
      }));

      setValue('attributes', formattedAttributes);
    }
  }, [product, setValue]);

  const categoryOptions: SelectOption[] = subCategories.map((category) => ({
    label: category.name,
    value: category.$id,
  }));

  const brandOptions: SelectOption[] = brands.map((brand) => ({
    label: brand.name,
    value: brand.$id,
  }));

  // ✅ Функция для добавления нового атрибута
  const addAttribute = () => {
    const currentAttributes = getValues('attributes') || [];
    const newAttribute = {
      quantity: 1, // Значение по умолчанию
      colors: [],
      size: [],
    };
    setValue('attributes', [...currentAttributes, newAttribute].slice(0, 5));
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(
      '📤 Before sending to Appwrite:',
      JSON.stringify(data, null, 2)
    );

    const dataForProduct = {
      name: data.name,
      price: data.price,
      subCategories: data.subCategories,
      brands: data.brands,
      attributes: [],
    };

    try {
      console.log('111111');

      const newProduct = await createProduct(dataForProduct);
      console.log('✅ New Product Response:', newProduct); // 🔥 Теперь тут будет объект с $id

      if (!newProduct || !newProduct.$id) {
        throw new Error('❌ Product creation failed: No ID received!');
      }

      const productId = newProduct.$id;
      console.log('✅ Created Product ID:', productId);

      console.log('✅ Created Product ID:', productId);

      // 🟢 2. Создаём атрибуты, передаём `productId`
      const attributeIds = await Promise.all(
        data.attributes.map(async (attr) => {
          const createdAttribute = await createDocument(
            DATABASE_ID,
            COLLECTION_ID_ATTR,
            {
              quantity: attr.quantity,
              colors: [attr.colors],
              size: [attr.size],
              products: productId,
            }
          );
          return createdAttribute.$id;
        })
      );

      console.log('✅ Created attribute IDs:', attributeIds);

      // 🟢 3. Обновляем продукт, добавляя `attributes`
      await updateDocument(DATABASE_ID, COLLECTION_ID_PRODUCT, productId, {
        attributes: attributeIds,
      });

      console.log('🎉 Product and attributes created successfully!');
    } catch (error) {
      console.error('❌ Error creating product:', error);
    }
  };

  return (
    <div className='content-box'>
      <h2>Product</h2>

      <Form
        layout='vertical'
        onFinish={handleSubmit(onSubmit, (errors) => {
          console.error('Ошибка валидации:', errors);
        })}
      >
        <Space>
          <Form.Item
            label='Product Name'
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
          >
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder='Product name'
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label='Price'
            validateStatus={errors.price ? 'error' : ''}
            help={errors.price?.message}
          >
            <Controller
              name='price'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder='Price'
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label='Category'
            validateStatus={errors.subCategories ? 'error' : ''}
            help={errors.subCategories?.message}
          >
            <Controller
              name='subCategories'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder='Select a category'
                  options={categoryOptions}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label='Brand'
            validateStatus={errors.brands ? 'error' : ''}
            help={errors.brands?.message}
          >
            <Controller
              name='brands'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder='Select a brand'
                  options={brandOptions}
                />
              )}
            />
          </Form.Item>
        </Space>

        <Button
          onClick={addAttribute}
          variant='outlined'
        >
          Add attribute
        </Button>

        <h2>Attributes</h2>

        <Controller
          name='attributes'
          control={control}
          render={({ field }) => (
            <>
              {field?.value &&
                field?.value.map((attribute, index) => (
                  <div
                    key={attribute.$id || index}
                    style={{
                      border: '1px solid #ddd',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                  >
                    <h4>Attribute {index + 1}</h4>

                    <Space>
                      <Form.Item label='Quantity'>
                        <Input
                          type='number'
                          value={attribute.quantity}
                          onChange={(e) => {
                            const newValue = [...field.value];
                            newValue[index].quantity = Number(e.target.value);
                            field.onChange(newValue);
                          }}
                        />
                      </Form.Item>

                      <Form.Item label='Colors'>
                        <Select
                          value={attribute.colors}
                          placeholder='Select colors'
                          options={colors.map((c) => ({
                            label: c.name,
                            value: c.$id,
                          }))}
                          onChange={(selectedColors) => {
                            const newValue = [...field.value];
                            newValue[index].colors = selectedColors;
                            field.onChange(newValue);
                          }}
                        />
                      </Form.Item>

                      <Form.Item label='Size'>
                        <Select
                          value={attribute.size}
                          placeholder='Select sizes'
                          options={sizes.map((s) => ({
                            label: s.name,
                            value: s.$id,
                          }))}
                          onChange={(selectedSizes) => {
                            const newValue = [...field.value];
                            newValue[index].size = selectedSizes;
                            field.onChange(newValue);
                          }}
                        />
                      </Form.Item>
                    </Space>
                  </div>
                ))}
            </>
          )}
        />

        <Button
          type='primary'
          htmlType='submit'
        >
          Save Product
        </Button>
      </Form>
    </div>
  );
};

export default ProductDetails;
