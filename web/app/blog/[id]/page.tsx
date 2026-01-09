import Container from '@/common/components/ui/Container/Container';
import Title from '@/common/components/ui/Title/Title';
import { getBlogById } from '@/lib/apis/blogs';
import { Flex, Image } from 'antd';
import { notFound } from 'next/navigation';
import './blog.scss';
import PageLayout from '@/common/components/layouts/PageLayout';
import { PageConfig } from '@/constants/pageConfig';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return notFound();
  }

  const breadCrumbsRoutes = [
    { label: 'Главная', href: PageConfig.HOME },
    { label: blog.title, href: `${PageConfig.BLOG}/${blog.$id}` },
  ];

  return (
    <PageLayout breadcrumbs={breadCrumbsRoutes}>
      <Flex
        vertical
        gap={24}
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '40px 0',
        }}
      >
        <Title text={blog.title} />

        <div className='image-container'>
          <Image
            src={blog.image}
            alt={blog.title}
            preview={false}
            width='100%'
            height={420}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>

        <p className='blog-content'>{blog.content}</p>
      </Flex>
    </PageLayout>
  );
}
