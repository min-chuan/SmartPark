import RequireAuth from '@/utils/RequireAuth';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
const Home = React.lazy(() => import('@/page/Home'));
const Login = React.lazy(() => import('@/page/Login'));
const NotFound = React.lazy(() => import('@/page/NotFound'));

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
