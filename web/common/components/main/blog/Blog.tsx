import Title from '../../ui/Title/Title';

import { getBlogs } from '@/lib/apis/blogs';

import BlogCarousel from './components/BlogCarousel';
import './Blog.css';

export default async function Blog() {
  const blogs = await getBlogs();

  if (!blogs) return null;

  return (
    <section className='blog'>
      <div className='blog-header'>
        <Title text='Наш блог' />
      </div>

      <BlogCarousel blogs={blogs} />
    </section>
  );
}
