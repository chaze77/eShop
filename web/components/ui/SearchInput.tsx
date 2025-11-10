import { Input } from '@nextui-org/react';
import SearchIcon from '../icons/SearchIcon';
import { useEffect, useState } from 'react';

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const id = setTimeout(() => {
      onSearch(value.trim());
    }, 600);
    return () => clearTimeout(id);
  }, [value, onSearch]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      isClearable
      size='sm'
      radius='md'
      variant='bordered'
      classNames={{
        base: 'w-64',
        inputWrapper:
          'h-9 bg-white/5 dark:bg-white/5 border-white/10 ' +
          'data-[hover=true]:bg-white/10 data-[focus=true]:bg-white/10',
        input: 'text-white placeholder:text-white/60',
      }}
      startContent={<SearchIcon />}
    />
  );
}
