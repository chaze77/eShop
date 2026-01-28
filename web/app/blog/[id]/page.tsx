// app/blog/[id]/page.tsx

import type { Metadata } from 'next';
import Title from '@/common/components/ui/Title/Title';
import PageShell from '@/common/components/layouts/PageShell';
import { getBlogs, getBlogById } from '@/lib/apis/blogs';
import { notFound } from 'next/navigation';
import { Flex, Image } from 'antd';
import './blog.css';

export const revalidate = 3600;

/* ----------------------------------
   SSG: какие /blog/[id] сгенерировать
----------------------------------- */
export async function generateStaticParams() {
  const blogs = (await getBlogs()) ?? [];
  return blogs.map((b) => ({ id: b.$id }));
}

/* ----------------------------------
   SEO / META (Next.js way)
----------------------------------- */
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const blog = await getBlogById(id);

  if (!blog) {
    return {
      title: 'Блог не найден',
    };
  }

  return {
    title: blog.title,
    description: blog.content.slice(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.content.slice(0, 160),
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.content.slice(0, 160),
      images: [blog.image],
    },
  };
}

/* ----------------------------------
   PAGE
----------------------------------- */
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const blog = await getBlogById(id);
  if (!blog) return notFound();

  return (
    <PageShell>
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
    </PageShell>
  );
}
