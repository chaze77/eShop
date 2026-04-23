'use client';

import { Row, Col } from 'antd';
import CardBlog from './CardBlog';
import { IBlog } from '@/common/types';

interface Props {
  blogs: IBlog[];
}

const BlogGrid = ({ blogs }: Props) => {
  return (
    <Row gutter={[24, 24]}>
      {blogs.map((blog) => (
        <Col
          key={blog.$id}
          xs={24}
          sm={24}
          md={12}
          lg={8}
          xl={8}
        >
          <CardBlog
            loading={false}
            id={blog.$id}
            img={blog.image}
            title={blog.title}
            text={blog.content}
          />
        </Col>
      ))}
    </Row>
  );
};

export default BlogGrid;
