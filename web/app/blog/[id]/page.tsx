import Container from '@/common/components/ui/Container/Container';
import Title from '@/common/components/ui/Title/Title';
import { getBlogById } from '@/lib/apis/blogs';
import { Flex, Image } from 'antd';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const blog = await getBlogById(params.id);

  if (!blog) {
    return <p>Блог не найден</p>;
  }

  return (
    <article>
      <Container>
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

          {/* Обложка */}
          <div style={{ borderRadius: 16, overflow: 'hidden' }}>
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

          {/* Контент */}
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: '#444',
              maxWidth: 760,
            }}
          >
            {blog.content}
          </p>
        </Flex>
      </Container>
    </article>
  );
}
