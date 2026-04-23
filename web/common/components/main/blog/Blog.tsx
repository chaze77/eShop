import { getBlogs } from '@/lib/apis/blogs';
import BlogGrid from './components/BlogCarousel';
import './Blog.css';
import Title from '@components/ui/Title/Title';

export default async function Blog() {
  const blogs = await getBlogs();

  if (!blogs) return null;

  return (
    <section className='blog'>
      <div className='blog-header'>
        <Title text='Наш блог' />
      </div>

      <BlogGrid blogs={blogs} />
    </section>
  );
}
