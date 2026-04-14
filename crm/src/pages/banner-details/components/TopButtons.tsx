import { Flex, Space } from 'antd';
import CustomButton from '@/components/ui/CustomButton/CustomButton';

type TopButtonsProps = {
  createMode: boolean;
  close: () => void;
  openDeleteModal: () => void;
};

const TopButtons = ({
  createMode,
  close,
  openDeleteModal,
}: TopButtonsProps) => {
  console.log(createMode, 'createMode');
  return (
    <Flex justify='space-between'>
      <Space>
        {createMode ? (
          <CustomButton
            action='create'
            htmlType='submit'
          />
        ) : (
          <CustomButton
            action='update'
            htmlType='submit'
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
