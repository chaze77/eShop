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
      setValue(
        'subCategories',
        product.subCategories?.map(
          (subCategory: IDirectory) => subCategory.$id
        ) || ''
      );
      setValue('brands', product.brands?.$id || '');
      setValue(
        'attributes',
        product.attributes.map((attr) => ({
          $id: attr.$id,
          quantity: attr.quantity,
          colors: attr.colors.map((color: IDirectory) => color.$id),
          size: attr.size.map((s: IDirectory) => s.$id),
        }))
      );
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Отправленные данные:', data);
  };

  return (
    <div className='content-box'>
      <h2>Product</h2>

      <Form
        layout='vertical'
        onFinish={handleSubmit(onSubmit)}
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

                    {/* Количество */}
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

                    {/* Цвета */}
                    <Form.Item label='Colors'>
                      <Select
                        mode='multiple'
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

                    {/* Размеры */}
                    <Form.Item label='Size'>
                      <Select
                        mode='multiple'
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
