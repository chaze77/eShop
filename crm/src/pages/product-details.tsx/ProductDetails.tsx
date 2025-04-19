import React, { useEffect } from 'react';
import { Form, Select, Input, Button, Space, Row, Col, Flex } from 'antd';
import { useProductStore } from '@/store/useProductStore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SCHEMA } from './productSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAttributeStore } from '@/store/useAttributeStore';
import { IAttributes, IProduct } from '@/types';
import AttributeField from '@/components/ui/Attributes/AttributesField';
import InputFileUpload from '@/components/ui/InputFileUpload/InputFileUpload';
import { getFileUrl, imageUpload } from '@/utils/getFileUrl';
import { useProductData } from './hooks/useProductData';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import Title from '@/components/ui/Title/Ttitle';
import './product.less';
import { useLocation } from 'react-router-dom';

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
  });

  const createProduct = useProductStore((state) => state.create);
  const updateProduct = useProductStore((state) => state.update);
  const location = useLocation();

  useEffect(() => {
    reset();
  }, [location.key]);

  const { id, product, subCategoriesSelect, brands, colors, sizes, tagsColl } =
    useProductData();

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

  const tagsOption: SelectOption[] = tagsColl.map((tag) => ({
    label: tag.name,
    value: tag.$id,
  }));

  const { TextArea } = Input;

  useEffect(() => {
    if (!product || !id) return;
    const {
      name,
      price,
      subCategories,
      brands,
      attributes,
      image,
      tags,
      desc,
    } = product;

    setValue('name', name);
    setValue('desc', desc);
    setValue('price', price);
    setValue(
      'subCategories',
      typeof subCategories === 'object' ? subCategories?.$id ?? '' : ''
    );
    setValue('brands', typeof brands === 'object' ? brands?.$id ?? '' : '');
    const tagsValue = tags?.map((tag) => {
      if (typeof tag === 'object') {
        return tag.$id;
      }
      return tag;
    });

    setValue('tags', tagsValue);

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
            products: product.$id ?? '',
          };
        }
        const { $id, quantity, colors, size } = attr;
        return {
          $id,
          quantity,
          colors: typeof colors === 'object' ? colors.$id : colors ?? '',
          size: typeof size === 'object' ? size.$id : size ?? '',
          products: product.$id ?? '',
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
    console.log('DATA', data);
    let imageToSave = data.image;

    if (data.image instanceof File) {
      try {
        const fileId = await imageUpload(data.image);
        imageToSave = getFileUrl(fileId);
        console.log(imageToSave, 'imageToSave');
      } catch (error) {
        console.error(error);
        return;
      }
    }

    const dataForProduct: Omit<IProduct, '$id'> = {
      name: data.name,
      price: data.price,
      subCategories: data?.subCategories ? data?.subCategories : '',
      brands: data.brands ?? '',
      desc: data.desc || '',
      image: imageToSave,
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
      if (!newProduct?.$id) {
        throw new Error('Product creation failed: No ID received!');
      }
      productId = newProduct.$id;
    }
    return productId;
  };

  // Обработчик удаления атрибута: удаляем из базы (если уже сохранён) и из состояния формы
  const handleDeleteAttribute = async (
    index: number,
    attribute: IAttributes
  ) => {
    if (attribute.$id) {
      try {
        await useAttributeStore.getState().deleteAttribute(attribute.$id);
      } catch (error) {
        console.error('Ошибка удаления атрибута:', error);
      }
    }
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
    <Flex vertical>
      <Title text='Продукт' />
      <Form
        layout='vertical'
        onFinish={handleSubmit(onSubmit, (errors) => {
          console.error('Validation errors:', errors);
        })}
      >
        <Space direction='vertical'>
          <Space align='end'>
            <Form.Item
              label='Наименование'
              validateStatus={errors.name ? 'error' : ''}
              help={errors.name?.message}
            >
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder='наименование'
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label='Цена'
              validateStatus={errors.price ? 'error' : ''}
              help={errors.price?.message}
            >
              <Controller
                name='price'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder='цена'
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              label='Описание'
              validateStatus={errors.desc ? 'error' : ''}
              help={errors.desc?.message}
            >
              <Controller
                name='desc'
                control={control}
                render={({ field }) => (
                  <TextArea
                    className='input-textarea'
                    {...field}
                    placeholder='описание'
                  />
                )}
              />
            </Form.Item>
          </Space>
          <Space align='start'>
            <Form.Item
              label='Группа'
              validateStatus={errors.subCategories ? 'error' : ''}
              help={errors.subCategories?.message}
            >
              <Controller
                name='subCategories'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className='select-width'
                    placeholder='группа'
                    options={categoryOptions}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              label='Бренд'
              validateStatus={errors.brands ? 'error' : ''}
              help={errors.brands?.message}
            >
              <Controller
                name='brands'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className='select-width'
                    placeholder='бренд'
                    options={brandOptions}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              label='Теги'
              validateStatus={errors.brands ? 'error' : ''}
              help={errors.brands?.message}
            >
              <Controller
                name='tags'
                control={control}
                render={({ field }) => (
                  <Select
                    className='select-width'
                    mode='multiple'
                    {...field}
                    placeholder='теги'
                    options={tagsOption}
                  />
                )}
              />
            </Form.Item>

            <Controller
              name='image'
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <InputFileUpload
                  image={field.value ? field.value : ''}
                  setImage={field.onChange}
                />
              )}
            />
          </Space>
          <Space style={{ marginBottom: '8px' }}>
            <Button
              onClick={addAttribute}
              variant='outlined'
            >
              Добавить атрибут
            </Button>
          </Space>
        </Space>

        <h4>Атрибуты</h4>

        <Row
          gutter={[16, 16]}
          style={{ marginBottom: '8px' }}
        >
          <Controller
            name='attributes'
            control={control}
            render={({ field }) => (
              <>
                {field.value &&
                  field.value.map((attribute, index) => (
                    <Col
                      key={attribute.$id || index}
                      span={12}
                    >
                      <AttributeField
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
                        onDelete={handleDeleteAttribute}
                      />
                    </Col>
                  ))}
              </>
            )}
          />
        </Row>

        <CustomButton
          action={id ? 'update' : 'create'}
          htmlType='submit'
        />
      </Form>
    </Flex>
  );
};

export default ProductDetails;
