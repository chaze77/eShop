import { Tabs, Card } from 'antd';
import { IProduct } from '@/common/types';
import './ProductTabs.css';
import { labels } from '@/constants/labels';

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
            label: labels.product.details,
            children: (
              <Card>
                <dl className='product-tabs__list'>
                  <div className='product-tabs__row'>
                    <dt className='product-tabs__label'>
                      {labels.product.articul}
                    </dt>
                    <dd className='product-tabs__value'>{product?.$id}</dd>
                  </div>
                  <div className='product-tabs__row'>
                    <dt className='product-tabs__label'>
                      {labels.product.category}
                    </dt>
                    <dd className='product-tabs__value'>
                      {product.subCategories?.relatedCategory.name}
                    </dd>
                  </div>
                  <div className='product-tabs__row'>
                    <dt className='product-tabs__label'>
                      {labels.product.brand}
                    </dt>
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
            label: labels.product.delivery,
            children: <Card>{labels.hints.common.mvpText}</Card>,
          },
          {
            key: 'payment',
            label: labels.product.payment,
            children: <Card>{labels.hints.common.mvpText}</Card>,
          },
          {
            key: 'faq',
            label: labels.product.FAQ,
            children: <Card>{labels.hints.common.mvpText}</Card>,
          },
        ]}
      />
    </div>
  );
};

export default ProductTabs;
