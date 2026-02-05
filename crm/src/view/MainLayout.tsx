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
import { LABELS } from '@/contstants/labels';
import { ConfigRoutes } from '@/contstants/page-routes';

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
    if (location.pathname.startsWith(ConfigRoutes.CATEGORIES)) return 'categories';
    if (location.pathname.startsWith(ConfigRoutes.SUB_CATEGORIES)) return 'subcategories';
    if (location.pathname.startsWith(ConfigRoutes.PRODUCTS)) return 'products';

    // Проверяем вложенные маршруты для справочников (References)
    if (location.pathname.startsWith(ConfigRoutes.REFERENCE_BRANDS)) return 'brands';
    if (location.pathname.startsWith(ConfigRoutes.REFERENCE_SIZES)) return 'sizes';
    if (location.pathname.startsWith(ConfigRoutes.REFERENCE_COLORS)) return 'colors';
    if (location.pathname.startsWith(ConfigRoutes.REFERENCE_TAGS)) return 'tags';

    return 'defaultKey';
  };

  // Конфигурация меню
  const items = [
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
        <div style={{ padding: '20px' }}>
          <h1 style={{ color: 'white', textAlign: 'center' }}>{LABELS.app.title}</h1>
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
              {user && <Button onClick={openConfirmationModal}>{LABELS.app.logout}</Button>}
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
        <Footer style={{ textAlign: 'center' }}>{LABELS.app.footer}</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
