import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { LABELS } from '@/constants/labels';
import { EmptyImage } from './components/EmptyImage/EmptyImage';
import { ImageLook } from './components/ImageLook/ImageLook';
import './input-file-upload.css';

interface InputFileUploadProps {
  value?: string | File | null;
  onChange?: (file: File | string | null) => void;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({
  value,
  onChange,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof value === 'string') {
      setFileName(value);
    } else if (value instanceof File) {
      setFileName(value.name);
    } else {
      setFileName(null);
    }
  }, [value]);

  const handleButtonClick = () => {
    if (hiddenFileInputRef.current) {
      hiddenFileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      onChange?.(file);
    }
  };

  const deleteFileLocal = () => {
    setFileName('');
    setPreviewUrl('');
    onChange?.(null);
  };

  return (
    <div className='file-upload-container'>
      <div className='file-upload-preview'>
        {previewUrl || fileName ? (
          <ImageLook
            previewUrl={previewUrl}
            fileName={fileName}
            deleteFileLocal={deleteFileLocal}
          />
        ) : (
          <EmptyImage />
        )}
      </div>
      <Button
        type='primary'
        icon={<UploadOutlined />}
        onClick={handleButtonClick}
      >
        {LABELS.fields.image}
      </Button>

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
