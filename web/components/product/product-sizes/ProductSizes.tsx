import React from 'react';
import { IDirectory } from '@/types';

interface ProductSizesProps {
  availableSizes: IDirectory[];
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  availableSizeIds: string[];
}

const ProductSizes: React.FC<ProductSizesProps> = ({
  availableSizes,
  selectedSize,
  setSelectedSize,
  availableSizeIds,
}) => {
  const getSizeClassName = (isAvailable: boolean, isActive: boolean) => {
    if (!isAvailable) {
      return 'opacity-40 cursor-not-allowed bg-slate-200';
    }

    if (isActive) {
      return 'bg-black text-white ring-2 ring-offset-2 ring-black scale-105';
    }

    return 'bg-slate-300 hover:scale-105 cursor-pointer';
  };

  return (
    <div>
      <p className='uppercase mb-2'>Размеры:</p>

      <div className='flex gap-2 flex-wrap mb-4'>
        {availableSizes.map((size) => {
          const isActive = selectedSize === size.$id;
          const isAvailable = availableSizeIds.includes(size.$id);

          return (
            <button
              key={size.$id}
              onClick={() => setSelectedSize(size.$id)}
              disabled={!isAvailable}
              className={`
                border w-10 h-10 rounded-md transition
                flex items-center justify-center text-sm
                ${getSizeClassName(isAvailable, isActive)}
                `}
            >
              {size.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSizes;
