import ProductContent from '@/components/product/ProductContent';
import Container from '@/components/ui/Container';
import { getProductById } from '@/lib/product';
import { IProduct } from '@/types';
import { notFound } from 'next/navigation';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product: IProduct | null = await getProductById(params.id);

  if (!product) return notFound();
  console.log(product, 'product');

  return (
    <Container className='max-w-[1500px] w-full border border-red-600 mx-auto'>
      <ProductContent product={product} />
    </Container>
  );
}
