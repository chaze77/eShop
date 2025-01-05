import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';

interface CardBlogProps {
  img: string;
  title: string;
  text: string;
}

export default function CardBlog({ img, title, text }: CardBlogProps) {
  return (
    <Card className='max-w-[500px] mt-2'>
      <CardHeader className='flex-col items-center'>
        <Image
          alt={title}
          className='object-cover'
          src={img}
          width={400}
        />
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <p className='text-tiny uppercase font-bold'>{title}</p>
        <small className='text-default-500'>{text}</small>
      </CardBody>
    </Card>
  );
}
