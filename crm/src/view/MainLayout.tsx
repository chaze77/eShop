import React, { useState } from 'react';
import {
  ProductOutlined,
  ShareAltOutlined,
  OneToOneOutlined,
  AppstoreOutlined,
  BgColorsOutlined,
  TagsOutlined,
  FormatPainterOutlined,
  ColumnWidthOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { Button, Flex, Layout, Menu, Space, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import showModal from '@/components/ui/Modal/ShowModal';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const logoutFunc = async () => {
    await logout();
    navigate('/');
  };

  const openConfirmationModal = () => {
    showModal({
      type: 'confirmationModal',
      onConfirm: logoutFunc,
    });
  };

  // Функция для установки активного ключа в меню
  const getActiveKey = () => {
    if (location.pathname.startsWith('/categories')) return 'categories';
    if (location.pathname.startsWith('/sub-categories')) return 'subcategories';
    if (location.pathname.startsWith('/products')) return 'products';

    // Проверяем вложенные маршруты для справочников (References)
    if (location.pathname.startsWith('/reference/brands')) return 'brands';
    if (location.pathname.startsWith('/reference/sizes')) return 'sizes';
    if (location.pathname.startsWith('/reference/colors')) return 'colors';
    if (location.pathname.startsWith('/reference/tags')) return 'tags';

    return 'defaultKey';
  };

  // Конфигурация меню
  const items = [
    {
      key: 'categories',
      icon: <ProductOutlined />,
      label: 'Categories',
      onClick: () => navigate('/categories'),
    },
    {
      key: 'subcategories',
      icon: <ShareAltOutlined />,
      label: 'SubCategories',
      onClick: () => navigate('/sub-categories'),
    },
    {
      key: 'products',
      icon: <OneToOneOutlined />,
      label: 'Products',
      onClick: () => navigate('/products'),
    },
    {
      key: 'blogs',
      icon: <CommentOutlined />,
      label: 'Blogs',
      onClick: () => navigate('/blogs'),
    },
    {
      key: 'references',
      icon: <AppstoreOutlined />,
      label: 'References',
      children: [
        {
          key: 'brands',
          icon: <FormatPainterOutlined />,
          label: 'Brands',
          onClick: () => navigate('/reference/brands'),
        },
        {
          key: 'sizes',
          icon: <ColumnWidthOutlined />,
          label: 'Sizes',
          onClick: () => navigate('/reference/sizes'),
        },
        {
          key: 'colors',
          icon: <BgColorsOutlined />,
          label: 'Colors',
          onClick: () => navigate('/reference/colors'),
        },
        {
          key: 'tags',
          icon: <TagsOutlined />,
          label: 'Tags',
          onClick: () => navigate('/reference/tags'),
        },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ padding: '20px' }}>
          <h1 style={{ color: 'white', textAlign: 'center' }}>CRM</h1>
        </div>

        <Menu
          theme='dark'
          defaultSelectedKeys={[getActiveKey()]}
          mode='inline'
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 8, background: colorBgContainer }}>
          <Flex justify='end'>
            <Space>
              <span style={{ fontSize: 16 }}>{user?.name}</span>
              {user && <Button onClick={openConfirmationModal}>Logout</Button>}
            </Space>
          </Flex>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>FOOTER</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
