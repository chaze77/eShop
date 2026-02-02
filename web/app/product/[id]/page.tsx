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
  // На всякий случай декодируем (если id когда-то попадёт в URL в encoded виде)
  const decodedId = decodeURIComponent(id);
  const product: IProduct | null = await getProductById(decodedId);

  if (!product) return notFound();

  return (
    <PageShell>
      <ProductContent product={product} />
    </PageShell>
  );
}
