'use client';

import ProductCard from './ProductCard';

type Props = {
  products: any[];
};

const CategoryProducts: React.FC<Props> = ({ products }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.$id}
        />
      ))}
    </div>
  );
};

export default CategoryProducts;
