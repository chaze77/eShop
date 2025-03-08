import { useProductStore } from '@/store/useProductStore';
import { useEffect } from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IAttributes, IDirectory, IProduct } from '@/types';
import showDeleteModal from '@/components/ui/Modal/ShowModal';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import Title from '@/components/ui/Title/Ttitle';

const Products: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const getProductList = useProductStore((state) => state.fetchProducts);
  const deleteProduct = useProductStore((state) => state.delete);

  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) getProductList();
  }, []);

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
      render: (brands: IDirectory) => brands?.name || '-',
    },
    {
      title: 'Теги',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: IDirectory[]) => (
        <>
          {tags?.map((tag) => (
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
      title: 'Фото',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => {
        if (image) {
          return (
            <img
              src={image}
              alt='Product'
              style={{
                width: '60px',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '4px',
              }}
            />
          );
        }
        return '-';
      },
    },

    {
      title: 'Действия',
      key: 'actions',
      render: (_: string, product: IProduct) => (
        <Space>
          <Button
            className='button-edit'
            type='primary'
            icon={<EditOutlined />}
            onClick={() => navigate(`/product-details/${product.$id}`)}
          />
          <Button
            type='primary'
            className='button-delete'
            danger
            icon={<DeleteOutlined />}
            onClick={() => openDeleteModal(product?.$id ? product?.$id : '')}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title text='Продукт' />
      <div style={{ marginBottom: '12px' }}>
        <CustomButton
          action='add'
          onClick={() => navigate('/product-details')}
        />
      </div>

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
                  title: 'Цвет',
                  dataIndex: 'colors',
                  key: 'colors',
                  render: (colors) => (colors ? colors.name : ''),
                },
                {
                  title: 'Размер',
                  dataIndex: 'size',
                  key: 'size',
                  render: (sizes) => (sizes ? sizes.name : ''),
                },
              ]}
              dataSource={
                product?.attributes &&
                product.attributes
                  .filter(
                    (attr): attr is IAttributes => typeof attr === 'object'
                  )
                  .map((attr, index) => ({
                    ...attr,
                    key: attr.$id || `temp-${index}`,
                  }))
              }
              pagination={false}
            />
          ),
          rowExpandable: (product) => {
            return (
              Array.isArray(product?.attributes) &&
              product.attributes.length > 0
            );
          },
        }}
      />
    </div>
  );
};

export default Products;
