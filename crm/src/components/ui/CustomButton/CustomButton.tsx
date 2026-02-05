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
import { LABELS } from '@/contstants/labels';

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
      text: LABELS.buttons.create,
      icon: <PlusOutlined />,
      className: 'button-create',
    },
    update: {
      text: LABELS.buttons.update,
      icon: <CheckOutlined />,
      className: 'button-update',
    },
    delete: {
      text: LABELS.buttons.delete,
      icon: <DeleteOutlined />,
      className: 'button-delete',
    },
    filter: {
      text: LABELS.buttons.filter,
      icon: <FilterOutlined />,
      className: 'button-filter',
    },
    close: {
      text: LABELS.buttons.close,
      icon: <CloseCircleOutlined />,
      className: 'button-close',
    },
    edit: {
      text: LABELS.buttons.edit,
      icon: <EditOutlined />,
      className: 'button-edit',
    },
    add: {
      text: LABELS.buttons.add,
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
