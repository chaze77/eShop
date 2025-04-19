interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <h4
      className='text-black text-lg font-black uppercase 
     md:text-2xl lg:text-3xl transition-all'
    >
      {text}
    </h4>
  );
};

export default Title;
