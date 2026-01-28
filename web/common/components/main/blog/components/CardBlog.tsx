'use client';

import { Card } from 'antd';
import CustomButton from '../../../ui/CustomButton';
import './CardBlog.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BUTTON_TYPE } from '@/common/types';
import { labels } from '@/constants/labels';

interface CardBlogProps {
  id: string;
  img: string;
  title: string;
  text: string;
}

export default function CardBlog({ id, img, title, text }: CardBlogProps) {
  const router = useRouter();

  // const goToBlog = (id: string) => {
  //   router.push(`/blog/${id}`);
  // };
  return (
    <Card
      className='card-blog'
      cover={
        <img
          alt={title}
          src={img}
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
