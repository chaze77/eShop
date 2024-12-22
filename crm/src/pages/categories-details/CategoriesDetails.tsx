import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCategoryStore from '@store/useCategoryStore';
import { Flex, Input, Space } from 'antd';
import CustomButton from '@components/ui/CustomButton/CustomButton';
import showDeleteModal from '@/components/ui/Modal/ShowModal';
import { validateName } from '@/utils/validation/validation';

const CategoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const category = useCategoryStore((state) => state.category);
  const getById = useCategoryStore((state) => state.getById);
  const reset = useCategoryStore((state) => state.resetCategory);
  const create = useCategoryStore((state) => state.create);
  const update = useCategoryStore((state) => state.update);
  const deleteItem = useCategoryStore((state) => state.delete);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: '',
  });

  const [createMode, setCreateMode] = useState<boolean>(!id);

  const [error, setError] = useState<string | null>(null); // Состояние для ошибки

  useEffect(() => {
    if (id) {
      getById(id);
      setCreateMode(false);
    }
  }, [id]);

  useEffect(() => {
    if (category) {
      setFormState({
        name: category.name,
      });
    }
  }, [category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Валидация поля
    const validationError = validateName(value);
    setError(validationError);

    setFormState((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  const handleSave = async () => {
    if (error || formState.name.trim() === '') {
      setError('Обязательное поле');
      return;
    }
    if (createMode) {
      await create(formState);
    } else if (id) {
      await update(id, formState);
    }
    navigate('/categories');
  };

  const close = () => {
    reset();
    setFormState({
      name: '',
    });
    navigate('/categories');
  };

  const handleDelete = async () => {
    if (id) await deleteItem(id);
    navigate('/categories');
  };

  const openDeleteModal = () => {
    showDeleteModal({
      type: 'deleteModal',
      onConfirm: handleDelete,
    });
  };

  return (
    <div className='content-box'>
      <h2>Category Details</h2>
      <Flex justify='space-between'>
        <Space>
          <CustomButton
            action={createMode ? 'create' : 'update'}
            onClick={handleSave}
          />
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
      <div>
        <Input
          placeholder='Введите название категории'
          value={formState.name}
          onChange={handleInputChange}
          status={error ? 'error' : ''}
        />
        {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
      </div>
    </div>
  );
};

export default CategoryDetails;
