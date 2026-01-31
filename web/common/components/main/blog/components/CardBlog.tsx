'use client';

import { Card } from 'antd';
import CustomButton from '../../../ui/CustomButton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BUTTON_TYPE } from '@/common/types';
import { labels } from '@/constants/labels';
import './CardBlog.css';

interface CardBlogProps {
  id: string;
  img: string;
  title: string;
  text: string;
  loading: boolean;
}

export default function CardBlog({
  id,
  img,
  title,
  text,
  loading,
}: CardBlogProps) {
  const router = useRouter();

  return (
    <Card
      loading={loading}
      cover={
        <img
          alt={title}
          src={img}
          className='card-blog-img'
        />
      }
    >
      <div className='card-blog-content'>
        <p className='card-blog-title'>{title}</p>
        <small className='card-blog-text'>{text}</small>
      </div>
      <div className='card-blog-actions'>
        <Link href={`/blog/${id}`}>
          <CustomButton
            variant={BUTTON_TYPE.SECOND}
            text={labels.common.learnMore}
          />
        </Link>
      </div>
    </Card>
  );
}
