'use client';

import { Dropdown, Space } from 'antd';
import { useRouter } from 'next/navigation';
import type { MenuProps } from 'antd';

import Chevron from '../../icons/Chevron';
import type { ICategory } from '../../../types';
import './CustomDropdown.css';

type Props = {
  category: ICategory;
};

export default function CustomDropdown({ category }: Props) {
  const router = useRouter();

  const items: MenuProps['items'] =
    category.subCategories?.map((sub) => ({
      key: sub.$id,
      label: sub.name,
      onClick: () => {
        router.push(`/category/${category.$id}?subCategories=${sub.$id}`);
      },
    })) ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <Dropdown
      menu={{ items, className: 'dropdown-dark-menu' }}
      trigger={['click']}
      placement='bottomLeft'
    >
      <div className='header-dropdown-trigger'>
        <Space size={6}>
          <span className='header-dropdown-title'>{category.name.trim()}</span>
          <Chevron />
        </Space>
      </div>
    </Dropdown>
  );
}
