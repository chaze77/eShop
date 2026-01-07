'use client';

import { Card } from 'antd';
import CustomButton from '../../../ui/CustomButton';
import './CardBlog.scss';
import { useRouter } from 'next/navigation';

interface CardBlogProps {
  id: string;
  img: string;
  title: string;
  text: string;
}

export default function CardBlog({ id, img, title, text }: CardBlogProps) {
  const router = useRouter();

  const goToBlog = (id: string) => {
    router.push(`/blog/${id}`);
  };
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
      <div className='card-blog__content'>
        <p className='card-blog__title'>{title}</p>
        <small className='card-blog__text'>{text}</small>
      </div>
      <div className='card-blog__actions'>
        <CustomButton
          action='second'
          text='Узнать подробнее'
          onClick={() => goToBlog(id)}
        />
      </div>
    </Card>
  );
}
