import ProductContent from '@/common/components/product/ProductContent';
import Container from '@/common/components/ui/Container/Container';
import { getProductById } from '@/lib/apis/product';
import { IProduct } from '@/common/types';
import { notFound } from 'next/navigation';
import PageLayout from '@/common/components/layouts/PageLayout';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product: IProduct | null = await getProductById(id);

  if (!product) return notFound();
  // console.log(product, 'product');

  return (
    <PageLayout>
      <ProductContent product={product} />
    </PageLayout>
  );
}
