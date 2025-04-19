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

const routes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: 'categories', element: <Categories /> },
          { path: 'sub-categories', element: <SubCategories /> },
          {
            path: 'sub-categories-details/:id?',
            element: <SubCategoryDetails />,
          },
          { path: 'reference/sizes', element: <Sizes /> },
          { path: 'reference/colors', element: <Colors /> },
          { path: 'reference/tags', element: <Tags /> },
          { path: 'reference/brands', element: <Brands /> },
          { path: 'products', element: <Products /> },
          {
            path: 'product-details/:id?',
            element: <ProductDetails />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
