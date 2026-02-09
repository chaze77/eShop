import React from 'react';
import { Form, Select, Input, Space, Row, Col, Flex } from 'antd';
import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { z } from 'zod';
import AttributeField from '@/components/ui/Attributes/AttributesField';
import InputFileUpload from '@/components/ui/InputFileUpload/InputFileUpload';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import Title from '@/components/ui/Title/Ttitle';
import { SCHEMA } from './productSchema';
import { IDirectory } from '@/types';
import { LABELS } from '@/constants/labels';

interface SelectOption {
  label: string;
  value: string;
}

type FormData = z.infer<typeof SCHEMA>;
type AttributeFormValue = FormData['attributes'][number];

interface ProductFormProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  onSubmit: SubmitHandler<FormData>;
  categoryOptions: SelectOption[];
  brandOptions: SelectOption[];
  colors: IDirectory[];
  sizes: IDirectory[];
  addAttribute: () => void;
  handleDeleteAttribute: (index: number) => void;
  id?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
  categoryOptions,
  brandOptions,
  colors,
  sizes,
  addAttribute,
  handleDeleteAttribute,
  id,
}) => {
  const { TextArea } = Input;

  return (
    <Flex vertical>
      <Title text={LABELS.pages.product} />
      <Form
        layout='vertical'
        onFinish={handleSubmit(onSubmit, (formErrors: unknown) => {
          console.error('Validation errors:', formErrors);
        })}
      >
        <Space direction='vertical'>
          <Space align='end'>
            <Form.Item
              label={LABELS.fields.name}
              validateStatus={errors.name ? 'error' : ''}
              help={errors.name?.message}
            >
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={LABELS.placeholders.name}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label={LABELS.fields.price}
              validateStatus={errors.price ? 'error' : ''}
              help={errors.price?.message}
            >
              <Controller
                name='price'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={LABELS.placeholders.price}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              label={LABELS.fields.desc}
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
                    placeholder={LABELS.placeholders.desc}
                  />
                )}
              />
            </Form.Item>
          </Space>
          <Space align='start'>
            <Form.Item
              label={LABELS.fields.group}
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
                    placeholder={LABELS.placeholders.group}
                    options={categoryOptions}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              label={LABELS.fields.brand}
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
                    placeholder={LABELS.placeholders.brand}
                    options={brandOptions}
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
            <CustomButton
              onClick={addAttribute}
              action='add'
            />
          </Space>
        </Space>

        <h4>{LABELS.fields.attributes}</h4>

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
                  field.value.map(
                    (attribute: AttributeFormValue, index: number) => (
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
                          onChange={(
                            newAttribute: AttributeFormValue,
                            idx: number,
                          ) => {
                            const newValue = [...field.value];
                            newValue[idx] = newAttribute;
                            field.onChange(newValue);
                          }}
                          onDelete={handleDeleteAttribute}
                        />
                      </Col>
                    ),
                  )}
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

export default ProductForm;
