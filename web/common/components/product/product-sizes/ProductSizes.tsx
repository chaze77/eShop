'use client';

import React from 'react';
import { Button, Typography, Tooltip } from 'antd';
import { IDirectory } from '@/common/types';
import { labels } from '@/constants/labels';

const { Text } = Typography;

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
  return (
    <div>
      <Text strong>{labels.filters.sizes}</Text>

      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        {availableSizes.map((size) => {
          const isActive = selectedSize === size.$id;
          const isAvailable = availableSizeIds.includes(size.$id);

          return (
            <Tooltip
              key={size.$id}
              title={
                !isAvailable ? `${labels.hints.common.notAvailable}` : undefined
              }
            >
              <Button
                onClick={() => setSelectedSize(size.$id)}
                disabled={!isAvailable}
                type={isActive ? 'primary' : 'default'}
                style={{
                  width: 40,
                  height: 40,
                  padding: 0,
                  fontSize: 12,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {size.name}
              </Button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSizes;
