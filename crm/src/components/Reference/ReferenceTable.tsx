// ReferenceTable.tsx
import React, { useEffect, useState } from 'react';
import { Input, Space, Table } from 'antd';
import EditModal from '@/components/ui/Modal/EditModal';
import showDeleteModal from '@/components/ui/Modal/ShowModal';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import { IBlog, IDirectory, Store } from '@/types';
import Title from '../ui/Title/Ttitle';

interface ReferenceTableProps {
  store: () => Store<IDirectory>;
  title: string;
}

interface DataSource {
  key: string;
  name: string;
}

const ReferenceTable: React.FC<ReferenceTableProps> = ({ store, title }) => {
  const { fetchItems, items, deleteItem, getById, item, update, create } =
    store();
  const [isLoading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ name: '' });
  const [editOpen, setEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchItems();
      setLoading(false);
    };

    if (!items.length) load();
  }, []);

  // useEffect(() => {
  //   console.log('MOUNT ReferenceTable');
  //   return () => console.log('UNMOUNT ReferenceTable');
  // }, []);

  const dataSource = items.map((item: IDirectory) => ({
    key: item.$id,
    name: item.name,
  }));

  const handleDelete = async (id: string) => {
    if (id) {
      setLoading(true);
      await deleteItem(id);
      await fetchItems();
      setLoading(false);
    }
  };

  const openDeleteModal = (id: string) => {
    showDeleteModal({
      type: 'deleteModal',
      onConfirm: () => handleDelete(id),
    });
  };

  const openEditModal = async (id: string) => {
    setEditOpen(true);
    setEditingId(id);

    await getById(id);
  };

  const closeEditModal = () => {
    setEditOpen(false);
    setEditingId(null);
  };

  const handleUpdate = async (values: { name: string }) => {
    if (!editingId) return;
    try {
      setLoading(true);
      await update(editingId, values);
      await fetchItems();
      closeEditModal();
    } catch (error) {
      console.error('Ошибка обновления:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    await create({ name: formState.name });
    await fetchItems();
    setFormState({ name: '' });
    setLoading(false);
  };

  const columns = [
    {
      title: title,
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Действие',
      key: 'actions',
      render: (_: string, record: DataSource) => (
        <Space>
          <CustomButton
            action='edit'
            onClick={() => openEditModal(record.key)}
          />
          <CustomButton
            action='delete'
            onClick={() => openDeleteModal(record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title text={title} />
      <Space style={{ marginBottom: '12px' }}>
        <CustomButton
          action='create'
          onClick={handleCreate}
        />
        <Input
          placeholder='Введите название'
          value={formState.name}
          onChange={(e) => setFormState({ name: e.target.value })}
        />
      </Space>
      <Table
        dataSource={dataSource}
        loading={isLoading}
        columns={columns}
        rowClassName='category-item'
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
      />
      <EditModal
        initialValues={item as IDirectory}
        visible={editOpen}
        onCancel={closeEditModal}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default ReferenceTable;
