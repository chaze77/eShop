import React, { useEffect } from 'react';
import { Form, Select, Input, Button, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SCHEMA } from './productSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useColorStore from '@/store/useColorStore';
import useSizeStore from '@/store/useSizeStore';
import useBrandStore from '@store/useBrandStore';
import useSubCategoryStore from '@/store/useSubCategoryStore';
import { useAttributeStore } from '@/store/useAttributeStore';
import { IAttributes } from '@/types';

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
  const updateProduct = useProductStore((state) => state.update);
  const createAttribute = useAttributeStore((state) => state.create);
  const updateAttribute = useAttributeStore((state) => state.updateAttribute);

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

  useEffect(() => {
    if (product && product.name) {
      setValue('name', product.name);
      setValue('price', product.price);
      const subCategoryId =
        typeof product.subCategories === 'object'
          ? product.subCategories?.$id
          : '';
      setValue('subCategories', subCategoryId);

      const brandId =
        typeof product.brands === 'object' ? product.brands?.$id : '';
      setValue('brands', brandId);

      // Извлекаем атрибуты, приводя colors и size к **одному ID**
      const formattedAttributes = product?.attributes
        ?.map((attr) =>
          typeof attr === 'object' && attr !== null
            ? {
                $id: attr.$id ?? '',
                quantity: attr.quantity ?? '',
                colors:
                  Array.isArray(attr.colors) && attr.colors.length > 0
                    ? typeof attr.colors[0] === 'object'
                      ? attr.colors[0].$id
                      : attr.colors[0]
                    : '',
                size:
                  Array.isArray(attr.size) && attr.size.length > 0
                    ? typeof attr.size[0] === 'object'
                      ? attr.size[0].$id
                      : attr.size[0]
                    : '',
                products: product.$id,
              }
            : null
        )
        .filter(Boolean); // ❗ Убираем `null` из массива

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
      quantity: 1,
      colors: '',
      size: '',
    };

    setValue('attributes', [...currentAttributes, newAttribute].slice(0, 5));
  };
  const handleProductCreationOrUpdate = async (data: FormData) => {
    const formattedAttributes: IAttributes[] =
      data.attributes?.map((attr) => ({
        $id: attr.$id ?? '', // 🟢 Гарантируем, что `$id` всегда строка
        quantity: attr.quantity,
        colors: Array.isArray(attr.colors) ? attr.colors : [attr.colors], // 🟢 Приводим к массиву
        size: Array.isArray(attr.size) ? attr.size : [attr.size], // 🟢 Приводим к массиву
      })) || [];
    const dataForProduct = {
      name: data.name,
      price: data.price,
      subCategories: data.subCategories ?? '',
      brands: data.brands,
      desc: data.desc || '',
      attributes: formattedAttributes,
    };

    let productId = id;

    if (productId) {
      console.log('🔄 Updating existing product:', productId);
      console.log('🔄 Updating existing product:', dataForProduct);
      await updateProduct(productId, dataForProduct);
    } else {
      console.log('🆕 Creating new product...');
      const newProduct = await createProduct(dataForProduct);
      if (!newProduct || !newProduct.$id) {
        throw new Error('Product creation failed: No ID received!');
      }
      productId = newProduct.$id;
      console.log('✅ Created Product ID:', productId);
    }

    return productId;
  };

  const handleAttributes = async (
    attributes: IAttributes[],
    productId: string
  ) => {
    return Promise.all(
      attributes.map(async (attr) => {
        if (attr.$id) {
          // 🟢 Обновление атрибута
          await updateAttribute(attr.$id, {
            quantity: attr.quantity,
            colors: attr.colors.map((color) =>
              typeof color === 'object' ? color.$id : color
            ), // ✅ Преобразуем `IDirectory[]` в `string[]`
            size: attr.size.map((s) => (typeof s === 'object' ? s.$id : s)), // ✅ Преобразуем `IDirectory[]` в `string[]`
            products: productId,
          });
          return attr.$id;
        } else {
          // 🟢 Создание нового атрибута
          const createdAttribute = await createAttribute({
            quantity: attr.quantity,
            colors: attr.colors.map((color) =>
              typeof color === 'object' ? color.$id : color
            ), // ✅ Убираем `[attr.colors]`, теперь передаётся массив строк
            size: attr.size.map((s) => (typeof s === 'object' ? s.$id : s)), // ✅ Убираем `[attr.size]`, теперь передаётся массив строк
            products: productId,
          });
          return createdAttribute.$id;
        }
      })
    );
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const productId = await handleProductCreationOrUpdate(data); // id уже внутри

      const formattedAttributes: IAttributes[] = data.attributes.map(
        (attr) => ({
          quantity: attr.quantity,
          colors: Array.isArray(attr.colors) ? attr.colors : [attr.colors], // ✅ Преобразуем в массив
          size: Array.isArray(attr.size) ? attr.size : [attr.size], // ✅ Преобразуем в массив
          products: productId,
        })
      );

      const attributeIds = await handleAttributes(
        formattedAttributes,
        productId
      );

      // const attributeIds = await handleAttributes(data.attributes, productId);

      // Убираем ненужные данные перед обновлением продукта
      const updatedProductData = {
        name: data.name,
        price: data.price,
        subCategories: data.subCategories ?? '',
        brands: data.brands,
        attributes: attributeIds.filter((id): id is string => Boolean(id)),
      };

      await updateProduct(productId, updatedProductData);

      console.log('🎉 Product and attributes processed successfully!');
    } catch (error) {
      console.error('❌ Error processing product:', error);
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
