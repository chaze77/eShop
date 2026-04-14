import { IBlog } from '@/common/types';
import { Carousel } from 'antd';
import CardBlog from './CardBlog';

interface Props {
  blogs: IBlog[];
}

const BlogCarousel = ({ blogs }: Props) => {
  return (
    <Carousel
      arrows
      infinite
      initialSlide={0}
      className='main-banner'
      autoplay
      slidesToShow={3}
      responsive={[
        { breakpoint: 1200, settings: { slidesToShow: 3 } },
        { breakpoint: 900, settings: { slidesToShow: 2 } },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          },
        },
      ]}
    >
      {blogs.map((blog) => (
        <div key={blog.id}>
          <CardBlog
            loading={false}
            id={blog.$id}
            img={blog.image}
            title={blog.title}
            text={blog.content}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default BlogCarousel;
