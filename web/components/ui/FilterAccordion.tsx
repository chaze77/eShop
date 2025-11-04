import { FilterKey, Selected } from '@/app/category/types';
import { Accordion, AccordionItem } from '@nextui-org/react';
import React from 'react';

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
  const base = 'px-3 py-1 border rounded text-sm';
  const baseTone = 'bg-black text-white border-black';

  const activeClass = 'bg-white text-black';

  return (
    <div>
      <Accordion>
        <AccordionItem
          key={accordingKey}
          aria-label={title}
          title={title}
        >
          <div className='flex flex-wrap gap-2'>
            {filterItems &&
              filterItems.map((item) => {
                const active = (selected[accordingKey] ?? []).includes(
                  item.$id
                );
                return (
                  <button
                    onClick={() => setFilter(accordingKey, item.$id)}
                    key={item.$id}
                    className={active ? `${activeClass}` : `${baseTone}`}
                  >
                    {item.name}
                  </button>
                );
              })}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterAccordion;
