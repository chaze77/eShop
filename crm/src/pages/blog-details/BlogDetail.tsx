import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Form, Input, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import InputFileUpload from '@/components/ui/InputFileUpload/InputFileUpload';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import showDeleteModal from '@/components/ui/Modal/ShowModal';
import { getFileUrl, imageUpload } from '@/utils/getFileUrl';

import useBlogStore from '@/store/useBlogStore';

type BlogFormValues = {
  title: string;
  content: string;
  image: string | File; // url
};

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const blog = useBlogStore((state: any) => state.blog);
  const getById = useBlogStore((state: any) => state.getById);
  const reset = useBlogStore((state: any) => state.resetBlogs); // D,D¯D, resetBlog / resetBlogsy D§DøD§ ¥Ÿ ¥,DæDñ¥? D«DøDú¥<DýDøDæ¥,¥?¥?
  const create = useBlogStore((state: any) => state.create);
  const update = useBlogStore((state: any) => state.update);
  const deleteItem = useBlogStore(
    (state: any) => state.deleteBlog || state.delete
  );

  const navigate = useNavigate();

  const [createMode, setCreateMode] = useState<boolean>(!id);
  const [form] = Form.useForm<BlogFormValues>();

  useEffect(() => {
    if (id) {
      getById(id);
      setCreateMode(false);
    } else {
      setCreateMode(true);
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (blog && id) {
      form.setFieldsValue({
        title: blog.title || '',
        content: blog.content || '',
        image: blog.image || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blog, id]);

  const buildPayload = async (values: BlogFormValues) => {
    let imageToSave = typeof values.image === 'string' ? values.image : '';

    if (values.image instanceof File) {
      const fileId = await imageUpload(values.image);
      imageToSave = getFileUrl(fileId);
    }

    return { ...values, image: imageToSave };
  };

  const handleCreate = async (values: BlogFormValues) => {
    const payload = await buildPayload(values);
    await create(payload);
    navigate('/blogs');
  };

  const handleUpdate = async (values: BlogFormValues) => {
    if (id) {
      const payload = await buildPayload(values);
      await update(id, payload);
    }
    navigate('/blogs');
  };

  const handleDelete = async () => {
    if (id) await deleteItem(id);
    navigate('/blogs');
  };

  const openDeleteModal = () => {
    showDeleteModal({
      type: 'deleteModal',
      onConfirm: handleDelete,
    });
  };

  const close = () => {
    reset?.();
    navigate('/blogs');
  };
  console.log('form', form);

  return (
    <div className='content-box'>
      <h2>Blog Details</h2>

      <Form<BlogFormValues>
        form={form}
        layout='vertical'
        onFinish={createMode ? handleCreate : handleUpdate}
        initialValues={{
          title: '',
          content: '',
          image: '',
        }}
      >
        <Flex justify='space-between'>
          <Space>
            {createMode ? (
              <CustomButton
                action='create'
                htmlType='submit'
              />
            ) : (
              <CustomButton
                action='update'
                htmlType='submit'
              />
            )}

            <CustomButton
              action='close'
              onClick={close}
            />
          </Space>

          {!createMode && (
            <CustomButton
              action='delete'
              onClick={openDeleteModal}
            />
          )}
        </Flex>

        <Form.Item
          label='Title'
          name='title'
          rules={[
            { required: true, message: 'Please input blog title!' },
            { min: 3, message: 'Title must be at least 3 characters!' },
          ]}
        >
          <Input placeholder='Blog Title' />
        </Form.Item>

        <Form.Item
          label='Content'
          name='content'
          rules={[
            { required: true, message: 'Please input blog content!' },
            { min: 10, message: 'Content must be at least 10 characters!' },
          ]}
        >
          <TextArea
            placeholder='Blog Content'
            rows={6}
          />
        </Form.Item>

        <Form.Item
          label='Image'
          name='image'
          noStyle
        >
          <InputFileUpload
            image={
              form.getFieldValue('image') ? form.getFieldValue('image') : ''
            }
            setImage={(val) => form.setFieldValue('image', val)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogDetails;
