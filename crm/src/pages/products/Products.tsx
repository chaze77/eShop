import { useProductStore } from '@/store/useProductStore';
import { useEffect } from 'react';
import { Table, Tag, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IDirectory, IProduct } from '@/types';
import showDeleteModal from '@/components/ui/Modal/ShowModal';

const Products: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const getProductList = useProductStore((state) => state.fetchProducts);
  const deleteProduct = useProductStore((state) => state.delete);

  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) getProductList();
  }, [products]);

  const openDeleteModal = (id: string) => {
    showDeleteModal({
      type: 'deleteModal',
      onConfirm: async () => await deleteProduct(id),
    });
  };

  const columns = [
    { title: 'Наименование', dataIndex: 'name', key: 'name' },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => `${price} kgs`,
    },
    {
      title: 'Бренд',
      dataIndex: 'brands',
      key: 'brands',
      render: (brands: IDirectory) => brands.name || '-',
    },
    {
      title: 'Теги',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: IDirectory[]) => (
        <>
          {tags.map((tag) => (
            <Tag
              key={tag.$id}
              color='cyan'
            >
              {tag.name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: string, product: IProduct) => (
        <Space>
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => navigate(`/product-details/${product.$id}`)}
          />
          <Button
            type='primary'
            danger
            icon={<DeleteOutlined />}
            onClick={() => openDeleteModal(product.$id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => navigate('/product-details')}>Add</Button>
      <Table
        columns={columns}
        dataSource={products.map((product) => ({
          ...product,
          key: product.$id,
        }))}
        bordered
        title={() => 'Список товаров'}
        expandable={{
          expandedRowRender: (product) => (
            <Table
              columns={[
                { title: 'Количество', dataIndex: 'quantity', key: 'quantity' },
                {
                  title: 'Цвета',
                  dataIndex: 'colors',
                  key: 'colors',
                  render: (colors) =>
                    colors.map((c: IDirectory) => c.name).join(', '),
                },
                {
                  title: 'Размеры',
                  dataIndex: 'size',
                  key: 'size',
                  render: (sizes) =>
                    sizes.map((s: IDirectory) => s.name).join(', '),
                },
              ]}
              dataSource={product.attributes.map((attr) => ({
                ...attr,
                key: attr.$id,
              }))}
              pagination={false}
            />
          ),
          rowExpandable: (product) => product.attributes.length > 0,
        }}
      />
    </div>
  );
};

export default Products;
