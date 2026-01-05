'use client';

import React from 'react';
import { Button, Typography } from 'antd';
import { IDirectory } from '@/common/types';

const { Text } = Typography;

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
      <Text strong>Цвета:</Text>

      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        {availableColors.map((color) => {
          const isActive = selectedColor === color.$id;

          return (
            <Button
              key={color.$id}
              onClick={() => setSelectedColor(color.$id)}
              shape='circle'
              style={{
                width: 32,
                height: 32,
                padding: 0,
                backgroundColor: color.name, // если name = hex / css-color
                border: '1px solid #d9d9d9',
                boxShadow: isActive ? '0 0 0 2px #000' : 'none',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductColors;
