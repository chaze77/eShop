import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCategoryStore from '@store/useCategoryStore';
import useSubCategoryStore from '@store/useSubCategoryStore';
import { Flex, Form, Input, Select, Space } from 'antd';
import CustomButton from '@components/ui/CustomButton/CustomButton';
import showDeleteModal from '@/components/ui/Modal/ShowModal';
import { LABELS } from '@/contstants/labels';
import { MESSAGES } from '@/contstants/messages';
import { ConfigRoutes } from '@/contstants/page-routes';

interface SelectOption {
  label: string;
  value: string;
}

interface ICategory {
  $id: string;
  name: string;
}

const SubCategoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categories: ICategory[] = useCategoryStore((state) => state.items);
  const fetchCategories = useCategoryStore((state) => state.fetchItems);

  const subCategory = useSubCategoryStore((state) => state.subCategory);
  const getById = useSubCategoryStore((state) => state.getById);
  const reset = useSubCategoryStore((state) => state.resetSubCategory);
  const create = useSubCategoryStore((state) => state.create);
  const update = useSubCategoryStore((state) => state.update);
  const deleteItem = useSubCategoryStore((state) => state.delete);

  const navigate = useNavigate();

  const [createMode, setCreateMode] = useState<boolean>(!id);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();

    if (id) {
      getById(id);
      setCreateMode(false);
    }
  }, [id]);

  useEffect(() => {
    if (subCategory) {
      form.setFieldsValue({
        name: subCategory.name,
        relatedCategory: subCategory.relatedCategory || '',
      });
    }
  }, [subCategory]);

  const handleCreate = async (values: {
    name: string;
    relatedCategory: string;
  }) => {
    await create(values);
    navigate(ConfigRoutes.SUB_CATEGORIES);
  };

  const handleUpdate = async (values: {
    name: string;
    relatedCategory: string;
  }) => {
    if (id) {
      await update(id, values);
    }

    navigate(ConfigRoutes.SUB_CATEGORIES);
  };

  const handleDelete = async () => {
    if (id) await deleteItem(id);
    navigate(ConfigRoutes.SUB_CATEGORIES);
  };

  const openDeleteModal = () => {
    showDeleteModal({
      type: 'deleteModal',
      onConfirm: handleDelete,
    });
  };

  const close = () => {
    reset();
    navigate(ConfigRoutes.SUB_CATEGORIES);
  };

  return (
    <div className='content-box'>
      <h2>{LABELS.pages.subCategories}</h2>
      <Form
        form={form}
        layout='vertical'
        onFinish={createMode ? handleCreate : handleUpdate}
        initialValues={{
          name: '',
          relatedCategory: '',
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
          label={LABELS.fields.subCategory}
          name='name'
          rules={[
            { required: true, message: MESSAGES.validation.subCategoryRequired },
            {
              min: 3,
              message: MESSAGES.validation.nameMin,
            },
          ]}
        >
          <Input placeholder={LABELS.placeholders.name} />
        </Form.Item>

        <Form.Item
          label={LABELS.fields.category}
          name='relatedCategory'
          rules={[{ required: true, message: MESSAGES.validation.categorySelect }]}
        >
          <Select
            placeholder={LABELS.placeholders.selectCategory}
            options={categories.map<SelectOption>((category: ICategory) => ({
              label: category.name,
              value: category.$id,
            }))}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SubCategoryDetails;