import { Flex, Space } from 'antd';
import CustomButton from '@/components/ui/CustomButton/CustomButton';

type TopButtonsProps = {
  createMode: boolean;
  close: () => void;
  openDeleteModal: () => void;
  isHexValid: boolean;
};

const TopButtons = ({
  createMode,
  close,
  openDeleteModal,
  isHexValid,
}: TopButtonsProps) => {
  console.log(createMode, 'createMode');
  return (
    <Flex justify='space-between'>
      <Space>
        {createMode ? (
          <CustomButton
            action='create'
            htmlType='submit'
            disabled={!isHexValid}
          />
        ) : (
          <CustomButton
            action='update'
            htmlType='submit'
            disabled={!isHexValid}
          />
        )}

        <CustomButton
          action='close'
          onClick={close}
        />
      </Space>

      {!createMode && (
        <CustomButton
          action='delete'
          onClick={openDeleteModal}
        />
      )}
    </Flex>
  );
};

export default TopButtons;
