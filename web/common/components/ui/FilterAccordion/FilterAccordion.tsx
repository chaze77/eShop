import { FilterKey, Selected } from '@/app/category/types';
import { Collapse, Button, Typography } from 'antd';
import React from 'react';
import './FilterAccordion.css';

interface FilterAccordionProps {
  accordingKey: FilterKey;
  title: string;
  filterItems: { $id: string; name: string }[];
  setFilter: (key: FilterKey, value: string) => void;
  selected: Selected;
}

const { Text } = Typography;

const FilterAccordion: React.FC<FilterAccordionProps> = ({
  accordingKey,
  title,
  filterItems,
  selected,
  setFilter,
}) => {
  return (
    <div className='filter-accordion-container'>
      <Collapse
        items={[
          {
            key: accordingKey,
            label: title,
            children: (
              <div className='filter-accordion-list'>
                {filterItems &&
                  filterItems.map((item) => {
                    const active = (selected[accordingKey] ?? []).includes(
                      item.$id,
                    );
                    return (
                      <Text
                        key={item.$id}
                        className={
                          active
                            ? 'filter-accordion-tag filter-accordion-tag-active'
                            : 'filter-accordion-tag'
                        }
                        onClick={() => setFilter(accordingKey, item.$id)}
                      >
                        {item.name}
                      </Text>
                    );
                  })}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default FilterAccordion;
