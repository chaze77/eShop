// AttributeField.tsx
import { IDirectory } from '@/types';
import { Button, Form, Input, Select, Space } from 'antd';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import './attributes.less';

interface AttributeFieldProps {
  attribute: {
    $id?: string;
    quantity?: number;
    colors?: string;
    size?: string;
  };
  index: number;
  colors: IDirectory[];
  sizes: IDirectory[];
  onChange: (
    newAttribute: {
      $id?: string;
      quantity?: number;
      colors?: string;
      size?: string;
    },
    index: number,
  ) => void;
  onDelete: (index: number) => void;
}

const AttributeField: React.FC<AttributeFieldProps> = ({
  attribute,
  index,
  colors,
  sizes,
  onChange,
  onDelete,
}) => {
  return (
    <div
      key={attribute.$id || index}
      style={{
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      <h4>Атрибут {index + 1}</h4>
      <Space
        align='end'
        size={[4, 8]}
        wrap
      >
        <Form.Item label='Кол-во'>
          <Input
            style={{ width: '60px' }}
            type='number'
            value={attribute.quantity}
            onChange={(e) =>
              onChange(
                { ...attribute, quantity: Number(e.target.value) },
                index,
              )
            }
          />
        </Form.Item>
        <Form.Item label='Цвет'>
          <Select
            className='select-width '
            value={attribute.colors}
            placeholder='Выберите цвет'
            options={colors.map((c) => ({
              label: c.name,
              value: c.$id,
            }))}
            onChange={(selected) =>
              onChange({ ...attribute, colors: selected }, index)
            }
          />
        </Form.Item>

        <Form.Item label='Размер'>
          <Select
            className='select-width '
            value={attribute.size}
            placeholder='выберите размер'
            options={sizes.map((s) => ({
              label: s.name,
              value: s.$id,
            }))}
            onChange={(selected) =>
              onChange({ ...attribute, size: selected }, index)
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(index)}
          />
        </Form.Item>
      </Space>
    </div>
  );
};

export default AttributeField;
