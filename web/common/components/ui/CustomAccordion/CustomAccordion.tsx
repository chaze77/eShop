'use client';

import { Collapse } from 'antd';
import ArrayRight from '../../icons/ArrayRight';
import { useRouter } from 'next/navigation';
import { ICategory } from '@/common/types';
import './CustomAccordion.scss';

export default function CustomAccordion({ category }: { category: ICategory }) {
  const router = useRouter();

  console.log(category, 'cat123');

  const handleSubcategoryClick = (subcategoryKey: string) => {
    router.push(`/category/${category.$id}?subcategory=${subcategoryKey}`);
  };

  return (
    <Collapse
      className='custom-accordion'
      expandIcon={() => <ArrayRight />}
      items={[
        {
          key: category.$id,
          label: category.name,
          children: (
            <div className='custom-accordion__body'>
              {category.subCategories?.map((subcategory) => (
                <div
                  key={subcategory.$id}
                  className='custom-accordion__item'
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
