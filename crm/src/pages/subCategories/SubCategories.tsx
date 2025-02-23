import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CustomButton from '@components/ui/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import { Table, Space } from 'antd';
import useSubCategoryStore from '@/store/useSubCategoryStore';
import './sub-categories.less';
import useCategoryStore from '@/store/useCategoryStore';
import BasicFilter from '@/components/Filters/BasicFilter';

const SubCategories: React.FC = () => {
  const subCategories = useSubCategoryStore((state) => state.subCategories);
  const fetchSubCategories = useSubCategoryStore(
    (state) => state.fetchSubCategories
  );

  const categories = useCategoryStore((state) => state.items);
  const fetchCategories = useCategoryStore((state) => state.fetchItems);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    fetchSubCategories();
    fetchCategories();
  }, [fetchSubCategories]);

  const toggleFilter = () => {
    setActiveFilter((prev) => !prev);
  };

  const onSearch = async (id: string) => {
    await fetchSubCategories({ category: id });
  };

  const onClear = async () => {
    await fetchSubCategories();
  };
  // Преобразуем данные, добавляя `categoryName`
  const dataSource = subCategories.map((subCategory) => ({
    key: subCategory.$id,
    name: subCategory.name,
    categoryName: subCategory.relatedCategory?.name || 'No Category', // Извлекаем имя категории
  }));

  const columns = [
    {
      title: 'SubCategory',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
  ];

  return (
    <div className='content-box'>
      <h2>SubCategories</h2>
      <Space>
        <CustomButton
          action='add'
          onClick={() => navigate('/sub-categories-details')}
        />
        <CustomButton
          action='filter'
          onClick={toggleFilter}
        />
        {activeFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <BasicFilter
              categories={categories}
              onSearch={onSearch}
              onClear={onClear}
            />
          </motion.div>
        )}
      </Space>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowClassName='sub-item'
        onRow={(record) => ({
          onClick: () => navigate(`/sub-categories-details/${record.key}`),
        })}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
      />
    </div>
  );
};

export default SubCategories;
