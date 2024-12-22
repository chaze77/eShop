// CustomButton.tsx
import React from 'react';
import { Button } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  CloseCircleOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import './CustomButton.less';

interface CustomButtonProps {
  action: 'create' | 'update' | 'delete' | 'filter' | 'close' | 'edit' | 'add';
  onClick?: () => void;
  htmlType?: 'button' | 'submit' | 'reset';
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  action,
  onClick,
  htmlType = 'button',
  type = 'default',
  disabled = false,
}) => {
  const actionConfig = {
    create: {
      text: 'Create',
      icon: <PlusOutlined />,
      className: 'button-create',
    },
    update: {
      text: 'Update',
      icon: <CheckOutlined />,
      className: 'button-update',
    },
    delete: {
      text: 'Delete',
      icon: <DeleteOutlined />,
      className: 'button-delete',
    },
    filter: {
      text: 'Filter',
      icon: <FilterOutlined />,
      className: 'button-filter',
    },
    close: {
      text: 'Close',
      icon: <CloseCircleOutlined />,
      className: 'button-close',
    },
    edit: {
      text: 'Edit',
      icon: <EditOutlined />,
      className: 'button-edit',
    },
    add: {
      text: 'Add',
      icon: <EditOutlined />,
      className: 'button-add',
    },
  };

  const { text, icon, className } = actionConfig[action];

  return (
    <Button
      className={className}
      onClick={onClick}
      htmlType={htmlType}
      type={type}
      disabled={disabled}
      icon={icon}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
