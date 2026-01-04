import { Card } from 'antd';
import CustomButton from '../../../ui/CustomButton';
import './CardBlog.scss';

interface CardBlogProps {
  img: string;
  title: string;
  text: string;
}

export default function CardBlog({ img, title, text }: CardBlogProps) {
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
        />
      </div>
    </Card>
  );
}
