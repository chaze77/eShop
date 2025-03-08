import { useEffect, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditModal from '@/components/ui/Modal/EditModal';
import showDeleteModal from '@/components/ui/Modal/ShowModal';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import { IDirectory, Store } from '@/types';

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
  const [formState, setFormState] = useState({ name: '' });
  const [editOpen, setEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) fetchItems();
  }, []);

  const dataSource = items.map((item: IDirectory) => ({
    key: item.$id,
    name: item.name,
  }));

  const handleDelete = async (id: string) => {
    if (id) {
      await deleteItem(id);
      fetchItems();
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
      await update(editingId, values);
      fetchItems();
      closeEditModal();
    } catch (error) {
      console.error('Ошибка обновления:', error);
    }
  };

  const handleCreate = async () => {
    await create({ name: formState.name });
    fetchItems();
    setFormState({ name: '' });
  };

  const columns = [
    {
      title: title,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: string, record: DataSource) => (
        <Space>
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => openEditModal(record.key)}
          >
            Edit
          </Button>
          <Button
            type='primary'
            danger
            icon={<DeleteOutlined />}
            onClick={() => openDeleteModal(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>{title}</h2>
      <Space>
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
