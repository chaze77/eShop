import { FilterKey, Selected } from '@/app/category/types';
import { Collapse, Button } from 'antd';
import React from 'react';
import './FilterAccordion.scss';

interface FilterAccordionProps {
  accordingKey: FilterKey;
  title: string;
  filterItems: { $id: string; name: string }[];
  setFilter: (key: FilterKey, value: string) => void;
  selected: Selected;
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({
  accordingKey,
  title,
  filterItems,
  selected,
  setFilter,
}) => {
  return (
    <div>
      <Collapse
        items={[
          {
            key: accordingKey,
            label: title,
            children: (
              <div className='filter-accordion__list'>
                {filterItems &&
                  filterItems.map((item) => {
                    const active = (selected[accordingKey] ?? []).includes(
                      item.$id
                    );
                    return (
                      <Button
                        key={item.$id}
                        className={
                          active
                            ? 'filter-accordion__tag filter-accordion__tag--active'
                            : 'filter-accordion__tag'
                        }
                        type={active ? 'default' : 'primary'}
                        onClick={() => setFilter(accordingKey, item.$id)}
                      >
                        {item.name}
                      </Button>
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
