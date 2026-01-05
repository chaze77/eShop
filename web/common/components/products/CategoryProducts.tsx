'use client';

import { IProduct } from '@/common/types';
import ProductCard from './ProductCard';
import { Col, Row } from 'antd';

type Props = {
  products: IProduct[];
};

const CategoryProducts: React.FC<Props> = ({ products }) => {
  return (
    <Row gutter={[0, 8]}>
      {products.map((product) => (
        <Col
          span={8}
          key={product.$id}
        >
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default CategoryProducts;
