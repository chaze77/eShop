'use client';

import { Collapse } from 'antd';
import { useRouter } from 'next/navigation';
import { ICategory } from '@/common/types';
import { RightOutlined } from '@ant-design/icons';
import './CustomAccordion.css';

export default function CustomAccordion({ category }: { category: ICategory }) {
  const router = useRouter();

  const handleSubcategoryClick = (subcategoryKey: string) => {
    router.push(`/category/${category.$id}?subcategory=${subcategoryKey}`);
  };

  if (!category.subCategories.length) {
    return null;
  }

  return (
    <Collapse
      className='custom-accordion'
      expandIcon={() => <RightOutlined style={{ color: '#B3B3B3' }} />}
      items={[
        {
          key: category.$id,
          label: category.name,
          children: (
            <div className='custom-accordion-body'>
              {category.subCategories?.map((subcategory) => (
                <div
                  key={subcategory.$id}
                  className='custom-accordion-item'
                  onClick={() => handleSubcategoryClick(subcategory.$id)}
                >
                  {subcategory.name}
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
