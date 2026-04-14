interface Props {
  value?: string;
  onChange?: (color: string) => void;
}

const NativeColorPicker = ({ value = '#000000', onChange }: Props) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div>
      <label htmlFor='colorPicker'>Select a color: </label>
      <input
        id='colorPicker'
        type='color'
        value={value}
        onChange={handleColorChange}
      />
      <input
        type='text'
        value={value}
        onChange={handleColorChange}
        style={{ marginLeft: '10px' }}
      />
    </div>
  );
};

export default NativeColorPicker;
