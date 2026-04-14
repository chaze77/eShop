import CustomButton from '@/components/ui/CustomButton/CustomButton';
import Title from '@/components/ui/Title/Ttitle';
import useBannerStore from '@/store/useBannerStore';
import { IBanner } from '@/types';
import { Space, Table } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { columns } from './columns';
import { ConfigRoutes } from '@/constants/page-routes';
import { ColorDisplay } from './components/ColorDisplay/ColorDisplay';

const Banners = () => {
  const banners = useBannerStore((state) => state.banners);
  const fetchBanners = useBannerStore((state) => state.fetchBanners);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleNavigate = () => {
    navigate(ConfigRoutes.BANNER_CREATE);
  };

  const dataSource = banners.map((banner: IBanner) => ({
    key: banner.$id,
    title: banner.title,
    textColor: <ColorDisplay color={banner.textColor} />,
    overlayColor: <ColorDisplay color={banner.colorOverlay} />,
    subTitle: banner.subTitle,
    imageDesktop: (
      <img
        src={banner.imageDesktop}
        alt={banner.title}
        style={{ width: '250px', height: 'auto' }}
      />
    ),
    imageMobile: (
      <img
        src={banner.imageMobile}
        alt={banner.title}
        style={{ width: '150px', height: 'auto' }}
      />
    ),
  }));

  console.log('Banners data source:', dataSource);

  return (
    <div className='content-box'>
      <Title text='Banners' />
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
          onClick: () => navigate(ConfigRoutes.BANNER_DETAILS_GET(record.key)),
        })}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
      />
    </div>
  );
};

export default Banners;
