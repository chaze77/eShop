import React, { useEffect } from 'react';
import useCategoryStore from '@store/useCategoryStore';
import CustomButton from '@components/ui/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import { Space, Table } from 'antd';
import './categories.less';

const Categories: React.FC = () => {
  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  console.log(categories, 'categories');

  const dataSource = categories.map((category) => ({
    key: category.$id,
    name: category.name,
  }));

  const columns = [
    {
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <div className='content-box'>
      <h2>Categories</h2>
      <Space>
        <CustomButton
          action='add'
          onClick={() => navigate('/categories-details')}
        />
      </Space>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowClassName='category-item'
        onRow={(record) => ({
          onClick: () => navigate(`/categories-details/${record.key}`),
        })}
        pagination={{
          defaultPageSize: 10, // Количество записей на странице по умолчанию
          pageSizeOptions: ['5', '10', '20', '50'], // Опции для количества записей
        }}
      />
    </div>
  );
};

export default Categories;
