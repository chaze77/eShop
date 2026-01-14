// app/blog/[id]/page.tsx
import Container from '@/common/components/ui/Container/Container';
import Title from '@/common/components/ui/Title/Title';
import PageLayout from '@/common/components/layouts/PageLayout';
import { getBlogs, getBlogById } from '@/lib/apis/blogs';
import { notFound } from 'next/navigation';
import { Flex, Image } from 'antd';
import './blog.scss';

export const revalidate = 3600; // обновлять кэш раз в час

type PageProps = { params: { id: string } };

// SSG prebuild: собрать все id постов
export async function generateStaticParams() {
  const blogs = (await getBlogs()) ?? [];
  return blogs.map((b) => ({ id: b.$id }));
}

export default async function Page({ params }: PageProps) {
  const blog = await getBlogById(params.id);
  if (!blog) return notFound();

  return (
    <PageLayout>
      <Flex
        vertical
        gap={24}
        style={{ maxWidth: 900, margin: '0 auto', padding: '40px 0' }}
      >
        <Title text={blog.title} />
        <div className='image-container'>
          <Image
            src={blog.image}
            alt={blog.title}
            preview={false}
            width='100%'
            height={420}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <p className='blog-content'>{blog.content}</p>
      </Flex>
    </PageLayout>
  );
}
