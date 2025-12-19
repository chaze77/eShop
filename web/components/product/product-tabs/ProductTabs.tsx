import { IProduct } from '@/types';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

type TabsProps = {
  product: IProduct;
};

const ProductTabs: React.FC<TabsProps> = ({ product }) => {
  return (
    <div className='flex w-full flex-col'>
      <Tabs
        aria-label='Options'
        variant='underlined'
        classNames={{
          cursor: 'bg-blue',
          tabContent: 'text-black',
        }}
      >
        <Tab
          key='details'
          title='Детали'
        >
          <Card>
            <CardBody>
              <dl className='space-y-2 text-sm text-black'>
                <div className='flex justify-between border-b border-dotted pb-1'>
                  <dt className='text-gray-500'>Артикул</dt>
                  <dd className='font-medium'>{product?.$id}</dd>
                </div>
                <div className='flex justify-between border-b border-dotted pb-1'>
                  <dt className='text-gray-500'>Категория</dt>
                  <dd className='font-medium'>
                    {product.subCategories?.relatedCategory.name}
                  </dd>
                </div>
                <div className='flex justify-between border-b border-dotted pb-1'>
                  <dt className='text-gray-500'>Бренд</dt>
                  <dd className='font-medium'>{product?.brands?.name}</dd>
                </div>
              </dl>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key='delivery'
          title='Доставка'
        >
          <Card>
            <CardBody>В разработке</CardBody>
          </Card>
        </Tab>
        <Tab
          key='payment'
          title='Оплата'
        >
          <Card>
            <CardBody>В разработке</CardBody>
          </Card>
        </Tab>
        <Tab
          key='faq'
          title='FAQ'
        >
          <Card>
            <CardBody>В разработке</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
