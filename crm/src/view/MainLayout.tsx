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
  PictureOutlined,
} from '@ant-design/icons';
import { Button, Flex, Layout, Menu, Space, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import showModal from '@/components/ui/Modal/ShowModal';
import { LABELS } from '@/constants/labels';
import { ConfigRoutes } from '@/constants/page-routes';

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

  const routeMap = [
    { path: ConfigRoutes.CATEGORIES, key: 'categories' },
    { path: ConfigRoutes.SUB_CATEGORIES, key: 'subcategories' },
    { path: ConfigRoutes.PRODUCTS, key: 'products' },
    { path: ConfigRoutes.REFERENCE_BRANDS, key: 'brands' },
    { path: ConfigRoutes.REFERENCE_SIZES, key: 'sizes' },
    { path: ConfigRoutes.REFERENCE_COLORS, key: 'colors' },
    { path: ConfigRoutes.REFERENCE_TAGS, key: 'tags' },
    { path: ConfigRoutes.BLOGS, key: 'blogs' },
    { path: ConfigRoutes.BANNERS, key: 'banners' },
  ];

  const getActiveKey = () => {
    const found = routeMap.find(({ path }) =>
      location.pathname.startsWith(path),
    );

    return found?.key ?? 'defaultKey';
  };

  const items = [
    {
      key: 'banners',
      icon: <PictureOutlined />,
      label: LABELS.menu.banners,
      onClick: () => navigate(ConfigRoutes.BANNERS),
    },

    {
      key: 'categories',
      icon: <ProductOutlined />,
      label: LABELS.menu.categories,
      onClick: () => navigate(ConfigRoutes.CATEGORIES),
    },
    {
      key: 'subcategories',
      icon: <ShareAltOutlined />,
      label: LABELS.menu.subCategories,
      onClick: () => navigate(ConfigRoutes.SUB_CATEGORIES),
    },
    {
      key: 'products',
      icon: <OneToOneOutlined />,
      label: LABELS.menu.products,
      onClick: () => navigate(ConfigRoutes.PRODUCTS),
    },
    {
      key: 'blogs',
      icon: <CommentOutlined />,
      label: LABELS.menu.blogs,
      onClick: () => navigate(ConfigRoutes.BLOGS),
    },
    {
      key: 'references',
      icon: <AppstoreOutlined />,
      label: LABELS.menu.references,
      children: [
        {
          key: 'brands',
          icon: <FormatPainterOutlined />,
          label: LABELS.menu.brands,
          onClick: () => navigate(ConfigRoutes.REFERENCE_BRANDS),
        },
        {
          key: 'sizes',
          icon: <ColumnWidthOutlined />,
          label: LABELS.menu.sizes,
          onClick: () => navigate(ConfigRoutes.REFERENCE_SIZES),
        },
        {
          key: 'colors',
          icon: <BgColorsOutlined />,
          label: LABELS.menu.colors,
          onClick: () => navigate(ConfigRoutes.REFERENCE_COLORS),
        },
        {
          key: 'tags',
          icon: <TagsOutlined />,
          label: LABELS.menu.tags,
          onClick: () => navigate(ConfigRoutes.REFERENCE_TAGS),
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
        <div style={{ padding: '24px' }}>
          <h1 style={{ color: 'white', textAlign: 'left' }}>
            {LABELS.app.title}
          </h1>
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
              {user && (
                <Button onClick={openConfirmationModal}>
                  {LABELS.app.logout}
                </Button>
              )}
            </Space>
          </Flex>
        </Header>
        <Content>
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
        <Footer style={{ textAlign: 'center' }}>{LABELS.app.footer}</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
