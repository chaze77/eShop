import './title.less';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className='title-container'>
      <h2>{text}</h2>
    </div>
  );
};

export default Title;
