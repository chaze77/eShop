import { useState } from 'react';
import { Button, Space, Select } from 'antd';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { ICategory } from '@/types';

interface FilterProps {
  onSearch: (id: string) => void;
  onClear: () => void;
  categories: ICategory[];
}

const BasicFilter: React.FC<FilterProps> = ({
  onSearch,
  onClear,
  categories,
}) => {
  const [id, setId] = useState('');

  const handleSearch = () => {
    onSearch(id);
  };

  const handleClear = () => {
    onClear();
    setId('');
  };

  console.log('id', id);

  return (
    <div>
      <Space>
        <Select
          style={{ minWidth: '150px' }}
          placeholder='Select a category'
          options={categories.map((category: ICategory) => ({
            label: category.name,
            value: category.$id,
          }))}
          value={id}
          onChange={(value) => setId(value)} // Обновляем состояние при выборе
        />
        <Button
          onClick={handleSearch}
          type='primary'
          icon={<SearchOutlined />}
        />
        <Button
          onClick={handleClear}
          color='primary'
          icon={<UndoOutlined />}
        />
      </Space>
    </div>
  );
};

export default BasicFilter;
