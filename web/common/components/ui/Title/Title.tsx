import './Title.scss';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return <h4 className='title'>{text}</h4>;
};

export default Title;
