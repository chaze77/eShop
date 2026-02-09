import React, { useEffect, useRef, useState } from 'react';
import { Button, Tooltip, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { LABELS } from '@/constants/labels';

const { Text } = Typography;

interface InputFileUploadProps {
  image: string | File | null;
  setImage: (file: File | string | null) => void;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({
  image,
  setImage,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof image === 'string') {
      setFileName(image);
    } else if (image instanceof File) {
      setFileName(image.name);
    } else {
      setFileName(null);
    }
  }, [image]);

  const handleButtonClick = () => {
    if (hiddenFileInputRef.current) {
      hiddenFileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setImage(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Tooltip title={fileName || LABELS.placeholders.file}>
        <Text
          ellipsis
          style={{
            maxWidth: 300,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block',
          }}
          type='secondary'
        >
          {fileName || LABELS.placeholders.file}
        </Text>
      </Tooltip>
      <Button
        type='primary'
        icon={<UploadOutlined />}
        onClick={handleButtonClick}
      >
        {LABELS.fields.image}
      </Button>

      {/* hidden input for file selection */}
      <input
        ref={hiddenFileInputRef}
        type='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default InputFileUpload;
