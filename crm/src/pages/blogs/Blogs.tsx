import CustomButton from '@/components/ui/CustomButton/CustomButton';
import Title from '@/components/ui/Title/Ttitle';
import useBlogStore from '@/store/useBlogStore';
import { Space, Table } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { columns } from './columns';
import { IBlog } from '@/types';

const Blogs = () => {
  const blogs = useBlogStore((state) => state.blogs);
  const fetchBlogs = useBlogStore((state) => state.fetchBlogs);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleNavigate = () => {
    navigate('/blog-detail');
  };

  const dataSource = blogs.map((blog: IBlog) => ({
    key: blog.$id,
    title: blog.title,
    content: blog.content,
    image: (
      <img
        src={blog.image}
        alt={blog.title}
        style={{ width: '200px' }}
      />
    ),
  }));
  return (
    <div className='content-box'>
      <Title text='Blogs' />
      <Space>
        <CustomButton
          action='add'
          onClick={handleNavigate}
        />
      </Space>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowClassName='sub-item'
        onRow={(record) => ({
          onClick: () => navigate(`/blog-detail/${record.key}`),
        })}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
      />
    </div>
  );
};

export default Blogs;
