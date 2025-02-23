import { useProductStore } from '@/store/useProductStore';
import { useEffect } from 'react';
import { Table, Tag, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Products: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const getProductList = useProductStore((state) => state.fetchProducts);

  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) getProductList();
  }, [products, getProductList]);

  const columns = [
    { title: 'Наименование', dataIndex: 'name', key: 'name' },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price} ₽`,
    },
    {
      title: 'Бренд',
      dataIndex: 'brands',
      key: 'brands',
      render: (brands) => brands.name || '-',
    },
    {
      title: 'Теги',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
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
      render: (_, product) => (
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
            onClick={() => deleteProduct(product.$id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products.map((product) => ({ ...product, key: product.$id }))}
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
                render: (colors) => colors.map((c) => c.name).join(', '),
              },
              {
                title: 'Размеры',
                dataIndex: 'size',
                key: 'size',
                render: (sizes) => sizes.map((s) => s.name).join(', '),
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
  );
};

export default Products;
