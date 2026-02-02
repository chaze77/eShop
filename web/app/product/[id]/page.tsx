import ProductContent from '@/common/components/product/ProductContent';
import { getProductById } from '@/lib/apis/product';
import { IProduct } from '@/common/types';
import { notFound } from 'next/navigation';
import PageShell from '@/common/components/layouts/PageShell';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product: IProduct | null = await getProductById(id);

  if (!product) return notFound();

  return (
    <PageShell>
      <ProductContent product={product} />
    </PageShell>
  );
}
