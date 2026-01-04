import { useEffect, useState } from 'react';
import { Input } from 'antd';
import SearchIcon from '../icons/SearchIcon';
import './SearchInput.scss';

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(value.trim());
    }, 1000);

    return () => clearTimeout(delay);
  }, [value, onSearch]);

  return (
    <div className='search-input'>
      <Input
        allowClear
        onChange={(e) => setValue(e.target.value)}
        prefix={<SearchIcon />}
        />
    </div>
  );
}
