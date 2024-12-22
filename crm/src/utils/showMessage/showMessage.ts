import { message } from 'antd';

const showMessage = (
  type: 'success' | 'error' | 'info' | 'warning',
  content: string
) => {
  message.open({
    type,
    content,
  });
};

export default showMessage;
