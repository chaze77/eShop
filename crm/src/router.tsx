import { createBrowserRouter, RouteObject } from 'react-router-dom';
import MainLayout from './view/MainLayout';
import Categories from './pages/categories/Categories';
import SubCategories from './pages/subCategories/SubCategories';
import SubCategoryDetails from './pages/subCategories-details/SubCategoryDetails';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import Sizes from './pages/reference/sizes';
import Colors from './pages/reference/colors';
import Tags from './pages/reference/tags';
import Brands from './pages/reference/brands';
import Products from './pages/products/Products';
import ProductDetails from './pages/product-details.tsx/ProductDetails';
import Blogs from './pages/blogs/Blogs';
import BlogDetails from './pages/blog-details/BlogDetail';
import { ConfigRoutes } from '@/contstants/page-routes';

const routes: RouteObject[] = [
  {
    path: ConfigRoutes.HOME,
    element: <ProtectedRoute />,
    children: [
      {
        path: ConfigRoutes.HOME,
        element: <MainLayout />,
        children: [
          { path: ConfigRoutes.CATEGORIES, element: <Categories /> },
          { path: ConfigRoutes.SUB_CATEGORIES, element: <SubCategories /> },
          {
            path: ConfigRoutes.SUB_CATEGORY_DETAILS,
            element: <SubCategoryDetails />,
          },
          { path: ConfigRoutes.BLOGS, element: <Blogs /> },
          {
            path: ConfigRoutes.BLOG_DETAILS,
            element: <BlogDetails />,
          },
          { path: ConfigRoutes.REFERENCE_SIZES, element: <Sizes /> },
          { path: ConfigRoutes.REFERENCE_COLORS, element: <Colors /> },
          { path: ConfigRoutes.REFERENCE_TAGS, element: <Tags /> },
          { path: ConfigRoutes.REFERENCE_BRANDS, element: <Brands /> },
          { path: ConfigRoutes.PRODUCTS, element: <Products /> },
          {
            path: ConfigRoutes.PRODUCT_DETAILS,
            element: <ProductDetails />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
