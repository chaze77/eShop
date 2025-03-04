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
import { IAttributes, IProduct } from '@/types';
import AttributeField from '@/components/ui/Attributes/AttributesField';
import useTagStore from '@/store/useTagsStore';

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
  const subCategoriesSelect = useSubCategoryStore(
    (state) => state.subCategories
  );
  const brands = useBrandStore((state) => state.items);
  const product = useProductStore((state) => state.product);
  const colors = useColorStore((state) => state.items);
  const sizes = useSizeStore((state) => state.items);
  const tags = useTagStore((state) => state.items);

  const fetchSubCategories = useSubCategoryStore(
    (state) => state.fetchSubCategories
  );
  const fetchBrands = useBrandStore((state) => state.fetchItems);
  const fetchColors = useColorStore((state) => state.fetchItems);
  const fetchSizes = useSizeStore((state) => state.fetchItems);
  const fetchTags = useTagStore((state) => state.fetchItems);
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
    if (subCategoriesSelect.length === 0) fetchSubCategories();
    if (brands.length === 0) fetchBrands();
    if (colors.length === 0) fetchColors();
    if (sizes.length === 0) fetchSizes();
    if (tags.length === 0) fetchTags();
  }, []);

  useEffect(() => {
    if (!product) return;
    const { name, price, subCategories, brands, attributes } = product;

    setValue('name', name);
    setValue('price', price);
    setValue(
      'subCategories',
      typeof subCategories === 'object' ? subCategories?.$id ?? '' : ''
    );
    setValue('brands', typeof brands === 'object' ? brands?.$id ?? '' : '');
    setValue(
      'tags',
      tags.map((tag) => tag.$id)
    );

    const formattedAttributes =
      attributes?.map((attr) => {
        if (typeof attr === 'object') {
          return {
            $id: attr.$id,
            quantity: attr.quantity,
            colors:
              typeof attr.colors === 'object'
                ? attr.colors.$id
                : attr.colors ?? '',
            size:
              typeof attr.size === 'object' ? attr.size.$id : attr.size ?? '',
            products: product.$id ?? '',
          };
        } else {
          return {
            $id: '',
            quantity: 1,
            colors: '',
            size: '',
            products: product.$id ?? '',
          };
        }
      }) ?? [];

    setValue('attributes', formattedAttributes);
  }, [product, setValue]);

  const categoryOptions: SelectOption[] = subCategoriesSelect.map(
    (category) => ({
      label: category.name,
      value: category.$id,
    })
  );

  const brandOptions: SelectOption[] = brands.map((brand) => ({
    label: brand.name,
    value: brand.$id,
  }));

  const tagsOption: SelectOption[] = tags.map((tag) => ({
    label: tag.name,
    value: tag.$id,
  }));

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
    const dataForProduct: Omit<IProduct, '$id'> = {
      name: data.name,
      price: data.price,
      subCategories: data?.subCategories ? data?.subCategories : '',
      brands: data.brands ?? '',
      desc: data.desc || '',
      tags: data?.tags ?? [],
      attributes:
        (data.attributes?.map(({ $id, quantity, colors, size }) => ({
          $id: $id ?? '',
          quantity,
          colors: colors ?? '',
          size: size ?? '',
        })) as IAttributes[]) ?? [],
    };

    let productId = id;

    if (productId) {
      await updateProduct(productId, dataForProduct);
    } else {
      const newProduct = await createProduct(dataForProduct);
      if (!newProduct?.$id)
        throw new Error('Product creation failed: No ID received!');
      productId = newProduct.$id;
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
          await updateAttribute(attr.$id, {
            quantity: attr.quantity,
            colors: attr.colors,
            size: attr.size,
            products: productId,
          });
          return attr.$id;
        } else {
          const createdAttribute = await createAttribute({
            quantity: attr.quantity,
            colors: attr.colors,
            size: attr.size,
            products: productId,
          });
          return createdAttribute.$id;
        }
      })
    );
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('DATA', data);

    try {
      const productId = await handleProductCreationOrUpdate(data);

      const formattedAttributes: IAttributes[] = (data.attributes ?? [])
        .filter(Boolean)
        .map((attr) => ({
          quantity: attr.quantity ?? 0,
          colors: attr.colors,
          size: attr.size,
          products: productId,
        }));

      const attributeIds = await handleAttributes(
        formattedAttributes,
        productId
      );

      // ✅ Убираем ненужные данные перед обновлением продукта
      const updatedProductData = {
        name: data.name,
        price: data.price,
        subCategories: data?.subCategories,
        brands: data?.brands,
        tags: data?.tags ?? [],
        attributes: attributeIds.filter((id): id is string => Boolean(id)),
      };

      await updateProduct(productId, updatedProductData as Partial<IProduct>);
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
          console.error('Validation errors:', errors);
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
          <Form.Item
            label='Tags'
            validateStatus={errors.brands ? 'error' : ''}
            help={errors.brands?.message}
          >
            <Controller
              name='tags'
              control={control}
              render={({ field }) => (
                <Select
                  mode='multiple'
                  {...field}
                  placeholder='Select a brand'
                  options={tagsOption}
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
              {field.value &&
                field.value.map((attribute, index) => (
                  <AttributeField
                    key={attribute.$id || index}
                    attribute={{
                      ...attribute,
                      quantity: attribute.quantity ?? 1,
                    }}
                    index={index}
                    colors={colors}
                    sizes={sizes}
                    onChange={(newAttribute, idx) => {
                      const newValue = [...field.value];
                      newValue[idx] = newAttribute;
                      field.onChange(newValue);
                    }}
                  />
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
