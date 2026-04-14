import './color-display.less';

export const ColorDisplay = ({ color }: { color: string }) => {
  return (
    <div
      className='color-display'
      style={{ backgroundColor: color }}
    >
      <span className='color-display-name'>{color}</span>
    </div>
  );
};
