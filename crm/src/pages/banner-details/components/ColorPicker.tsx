import { useEffect } from 'react';
import { isValidHex } from '../../../utils/validation/validHex';
interface Props {
  value?: string;
  onChange?: (color: string) => void;
  checkIsValidHex?: (isValid: boolean) => void;
}

const NativeColorPicker = ({
  value = '#000000',
  onChange,
  checkIsValidHex,
}: Props) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const normalized = input.startsWith('#') ? input : `#${input}`;

    if (isValidHex(normalized)) {
      onChange?.(normalized);
    } else {
      onChange?.(input);
    }
  };

  const isValid = isValidHex(value);

  useEffect(() => {
    checkIsValidHex?.(isValid);
  }, [isValid]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input
        id='colorPicker'
        type='color'
        value={isValid ? value : '#000000'}
        onChange={handleColorChange}
      />
      <input
        type='text'
        value={value}
        onChange={handleTextChange}
        placeholder='#000000'
        maxLength={7}
        style={{
          marginLeft: 4,
          borderColor: isValid ? undefined : 'red',
          outline: isValid ? undefined : '1px solid red',
        }}
      />
      {!isValid && (
        <span style={{ color: 'red', fontSize: 12 }}>Неверный HEX</span>
      )}
    </div>
  );
};

export default NativeColorPicker;
