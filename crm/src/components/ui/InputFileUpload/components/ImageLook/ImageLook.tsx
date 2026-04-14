import { Button, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './image-look.css';

export const ImageLook = ({
  previewUrl,
  fileName,
  deleteFileLocal,
}: {
  previewUrl?: string | null;
  fileName?: string | null;
  deleteFileLocal: () => void;
}) => {
  return (
    <div className='image-box'>
      <Image
        src={previewUrl || fileName || undefined}
        alt={'fileName'}
        className='image-img'
      />
      <div className='image-box-overlay'>
        <Button
          type='primary'
          className='button-delete'
          danger
          icon={<DeleteOutlined />}
          onClick={deleteFileLocal}
        />
      </div>
    </div>
  );
};
