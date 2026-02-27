import RequireAuth from '@/utils/RequireAuth';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
const Home = React.lazy(() => import('@/page/home'));
const Login = React.lazy(() => import('@/page/login'));
const NotFound = React.lazy(() => import('@/page/notFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth allowed={true} redirectTo="/login">
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: '/login',
    element: (
      <RequireAuth allowed={false} redirectTo="/">
        <Login />
      </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
