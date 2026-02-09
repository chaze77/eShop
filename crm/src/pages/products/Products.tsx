import { useProductStore } from '@/store/useProductStore';
import { useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IAttributes, IProduct } from '@/types';
import showDeleteModal from '@/components/ui/Modal/ShowModal';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import Title from '@/components/ui/Title/Ttitle';
import useColorStore from '@/store/useColorStore';
import useSizeStore from '@/store/useSizeStore';

const Products: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const getProductList = useProductStore((state) => state.fetchProducts);
  const deleteProduct = useProductStore((state) => state.delete);
  const colors = useColorStore((state) => state.items);
  const fetchColors = useColorStore((state) => state.fetchItems);
  const sizes = useSizeStore((state) => state.items);
  const fetchSizes = useSizeStore((state) => state.fetchItems);

  const navigate = useNavigate();

  useEffect(() => {
    if (colors.length === 0) fetchColors();
    if (sizes.length === 0) fetchSizes();
    if (products.length === 0) {
      getProductList(undefined, { expand: true });
    }
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
      render: (price: string) => price,
    },
    {
      title: 'Описание',
      dataIndex: 'desc',
      key: 'desc',
      render: (desc: string) => desc,
    },
    {
      title: 'Сабкатегория',
      dataIndex: 'subCategories',
      key: 'subCategories',
      render: (subCategories: IProduct['subCategories']) =>
        typeof subCategories === 'object' && subCategories
          ? subCategories.name
          : (subCategories ?? '-'),
    },
    {
      title: 'Бренд',
      dataIndex: 'brands',
      key: 'brands',
      render: (brands: IProduct['brands']) =>
        typeof brands === 'object' && brands ? brands.name : (brands ?? '-'),
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
                  render: (colorId: string) =>
                    colors.find((c) => c.$id === colorId)?.name ?? '',
                },
                {
                  title: 'Размер',
                  dataIndex: 'size',
                  key: 'size',
                  render: (sizeId: string) =>
                    sizes.find((s) => s.$id === sizeId)?.name ?? '',
                },
              ]}
              dataSource={
                product?.attributes &&
                product.attributes
                  .filter(
                    (attr): attr is IAttributes => typeof attr === 'object',
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
