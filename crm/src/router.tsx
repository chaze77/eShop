import { createBrowserRouter, RouteObject } from 'react-router-dom';
import MainLayout from './view/MainLayout';
import Categories from './pages/categories/Categories';
import CategoryDetails from './pages/categories-details/CategoriesDetails';
import SubCategories from './pages/subCategories/SubCategories';
import SubCategoryDetails from './pages/subCategories-details/SubCategoryDetails';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute />, // Проверяем авторизацию на корневом маршруте
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: 'categories', element: <Categories /> },
          { path: 'categories-details/:id?', element: <CategoryDetails /> },
          { path: 'sub-categories', element: <SubCategories /> },
          {
            path: 'sub-categories-details/:id?',
            element: <SubCategoryDetails />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
