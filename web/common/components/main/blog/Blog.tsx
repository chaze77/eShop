'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Title from '../../ui/Title/Title';
import CardBlog from './components/CardBlog';
import { getBlogs } from '@/lib/apis/blogs';
import type { IBlog } from '@/common/types';
import './Blog.css';

export default function Blog() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await getBlogs();
        setBlogs(response ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className='blog'>
      <div className='blog-header'>
        <Title text='Наш блог' />
      </div>

      <Row
        gutter={[8, 8]}
        className='blog-grid'
      >
        {blogs.map((item) => (
          <Col
            key={item.$id}
            xs={24}
            sm={12}
            lg={8}
          >
            <CardBlog
              loading={loading}
              id={item.$id}
              img={item.image}
              title={item.title}
              text={item.content}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
}
