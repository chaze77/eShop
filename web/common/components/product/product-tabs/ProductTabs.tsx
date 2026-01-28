import { IProduct } from '@/common/types';
import { Tabs, Card } from 'antd';
import './ProductTabs.css';

type TabsProps = {
  product: IProduct;
};

const ProductTabs: React.FC<TabsProps> = ({ product }) => {
  return (
    <div className='product-tabs'>
      <Tabs
        items={[
          {
            key: 'details',
            label: 'details',
            children: (
              <Card>
                <dl className='product-tabs__list'>
                  <div className='product-tabs__row'>
                    <dt className='product-tabs__label'>product</dt>
                    <dd className='product-tabs__value'>{product?.$id}</dd>
                  </div>
                  <div className='product-tabs__row'>
                    <dt className='product-tabs__label'>Category</dt>
                    <dd className='product-tabs__value'>
                      {product.subCategories?.relatedCategory.name}
                    </dd>
                  </div>
                  <div className='product-tabs__row'>
                    <dt className='product-tabs__label'>Brand</dt>
                    <dd className='product-tabs__value'>
                      {product?.brands?.name}
                    </dd>
                  </div>
                </dl>
              </Card>
            ),
          },
          {
            key: 'delivery',
            label: 'delivery',
            children: <Card>delivery</Card>,
          },
          {
            key: 'payment',
            label: 'payment',
            children: <Card>payment</Card>,
          },
          {
            key: 'faq',
            label: 'FAQ',
            children: <Card>FAQ</Card>,
          },
        ]}
      />
    </div>
  );
};

export default ProductTabs;

