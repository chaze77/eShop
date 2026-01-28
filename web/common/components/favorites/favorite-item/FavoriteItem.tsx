'use client';

import React from 'react';
import type { IProduct } from '@/common/types';
import { Button, Flex, Image, Space, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { PageConfig } from '@/constants/pageConfig';

type FavoriteItemProps = {
  favorites: IProduct[];
  onRemove: (productId: string) => void;
};

const FavoriteItems: React.FC<FavoriteItemProps> = ({
  favorites,
  onRemove,
}) => {
  const { Text } = Typography;

  const router = useRouter();
  return (
    <div className='favorites-items'>
      {favorites.map((item) => (
        <Flex
          key={item.$id}
          justify='space-between'
          align='flex-start'
          gap={16}
        >
          <Flex
            gap={4}
            align='center'
          >
            <Image
              src={item.image}
              alt={item.name}
              width={90}
              height={90}
              preview={false}
              onClick={() => router.push(PageConfig.PRODUCT(item.$id))}
            />
            <Space orientation='vertical'>
              <Text>{item.name}</Text>
              <Text>{item?.brands?.name}</Text>
            </Space>
          </Flex>
          <Button
            type='link'
            onClick={() => onRemove(item.$id)}
          >
            Удалить
          </Button>
        </Flex>
      ))}
    </div>
  );
};

export default FavoriteItems;
