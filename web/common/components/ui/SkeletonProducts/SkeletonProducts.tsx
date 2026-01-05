import { Flex, Skeleton } from 'antd';

export const SkeletonProducts = () => {
  return (
    <Flex
      justify='space-between'
      align='center'
      style={{ paddingBottom: '20px' }}
    >
      {[1, 2, 3, 4].map((i) => (
        <Skeleton.Input
          key={i}
          active
          size='large'
          style={{ height: 160, width: '100%' }}
        />
      ))}
    </Flex>
  );
};
