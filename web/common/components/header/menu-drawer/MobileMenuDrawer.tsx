'use client';

import { Button, Drawer, Input } from 'antd';
import CustomAccordion from '@/common/components/ui/CustomAccordion/CustomAccordion';
import { ICategory } from '@/common/types';
import { labels } from '@/constants/labels';

type Props = {
  open: boolean;
  onClose: () => void;

  q: string;
  categories: ICategory[];

  onSearch: (value: string) => void;
  onClearSearch: () => void;

  onNavigate: (path: string) => void;
};

export default function MobileMenuDrawer({
  open,
  onClose,
  q,
  categories,
  onSearch,
  onClearSearch,
  onNavigate,
}: Props) {
  const { Search } = Input;

  return (
    <Drawer
      open={open}
      placement='left'
      onClose={onClose}
      className='mobile-drawer'
    >
      <Search
        defaultValue={q}
        placeholder={labels.placeholders.search}
        onSearch={(value) => {
          onSearch(value);
          onClose();
        }}
        onChange={onClearSearch}
        allowClear
        className='mobile-search'
      />

      <div className='mobile-nav'>
        {categories.map((cat) => (
          <CustomAccordion
            key={cat.$id}
            category={cat}
          />
        ))}
      </div>
    </Drawer>
  );
}
