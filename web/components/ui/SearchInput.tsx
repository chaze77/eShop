import { Input } from '@nextui-org/react';
import SearchIcon from '../icons/SearchIcon';
import { useEffect, useState } from 'react';

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
    <div className='w-[240px] px-8 rounded-2xl flex justify-center items-center'>
      <Input
        isClearable
        onChange={(e) => setValue(e.target.value)}
        classNames={{
          input: ['bg-transparent', 'text-black/90 dark:text-white/90'],
          inputWrapper: ['bg-default-200/50', 'cursor-text!'],
        }}
        radius='md'
        startContent={<SearchIcon />}
      />
    </div>
  );
}
