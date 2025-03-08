// AttributeField.tsx
import { IAttributes } from '@/types';
import { Button, Form, Input, Select, Space } from 'antd';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

interface AttributeFieldProps {
  attribute: IAttributes;
  index: number;
  colors: { name: string; $id: string }[];
  sizes: { name: string; $id: string }[];
  onChange: (newAttribute: IAttributes, index: number) => void;
  onDelete: (index: number, attribute: IAttributes) => void;
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
        marginBottom: '10px',
      }}
    >
      <h4>Attribute {index + 1}</h4>
      <Space>
        <Form.Item label='Quantity'>
          <Input
            type='number'
            value={attribute.quantity}
            onChange={(e) =>
              onChange(
                { ...attribute, quantity: Number(e.target.value) },
                index
              )
            }
          />
        </Form.Item>

        <Form.Item label='Colors'>
          <Select
            value={attribute.colors}
            placeholder='Select color'
            options={colors.map((c) => ({
              label: c.name,
              value: c.$id,
            }))}
            onChange={(selected) =>
              onChange({ ...attribute, colors: selected }, index)
            }
          />
        </Form.Item>

        <Form.Item label='Size'>
          <Select
            value={attribute.size}
            placeholder='Select size'
            options={sizes.map((s) => ({
              label: s.name,
              value: s.$id,
            }))}
            onChange={(selected) =>
              onChange({ ...attribute, size: selected }, index)
            }
          />
        </Form.Item>
        <Button
          type='primary'
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(index, attribute)}
        />
      </Space>
    </div>
  );
};

export default AttributeField;
