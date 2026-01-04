'use client';

import { Dropdown, Space } from 'antd';
import { useRouter } from 'next/navigation';
import type { MenuProps } from 'antd';

import Chevron from '../../icons/Chevron';
import type { ICategory } from '../../../types';
import './CustomDropdown.scss';

export default function CustomDropdown({ category }: { category: ICategory }) {
  const router = useRouter();

  const items: MenuProps['items'] =
    category.subCategories?.map((sub) => ({
      key: sub.$id,
      label: sub.name,
      onClick: () => {
        router.push(`/category/${category.$id}?subCategories=${sub.$id}`);
      },
    })) ?? [];

  if (!items.length) {
    return (
      <div onClick={() => router.push(`/category/${category.$id}`)}>
        <span>{category.name}</span>
      </div>
    );
  }

  return (
    <Dropdown
      menu={{ items, className: 'dropdown-dark-menu' }}
      trigger={['click']}
      placement='bottomLeft'
    >
      <div className='header-dropdown-trigger'>
        <Space size={6}>
          <span className='header-dropdown-title'>{category.name}</span>
          <Chevron />
        </Space>
      </div>
    </Dropdown>
  );
}
