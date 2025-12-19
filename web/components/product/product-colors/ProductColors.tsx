import { COLOR_CLASS_MAP } from '@/constants/colors';
import { IDirectory } from '@/types';
import React, { Dispatch } from 'react';

interface ProductColorsProps {
  availableColors: IDirectory[];
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  selectedColor: string;
}

const ProductColors: React.FC<ProductColorsProps> = ({
  availableColors,
  setSelectedColor,
  selectedColor,
}) => {
  console.log(availableColors, 'availableColors');

  return (
    <div>
      <p className='uppercase mb-2'>Цвета:</p>
      <div className='flex gap-2 flex-wrap mb-4'>
        {availableColors.map((color) => {
          const isActive = selectedColor === color.$id;

          return (
            <button
              key={color.$id}
              onClick={() => setSelectedColor(color.$id)}
              className={`${COLOR_CLASS_MAP[color.name]}
              w-8 h-8 rounded-full border cursor-pointer transition
              ${
                isActive
                  ? 'ring-2 ring-offset-2 ring-black scale-110'
                  : 'hover:scale-110'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductColors;
