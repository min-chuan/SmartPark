import { createBrowserRouter } from 'react-router-dom';
import React from 'react';

const Home = React.lazy(() => import('@/page/Home'));
const Login = React.lazy(() => import('@/page/Login'));
const NotFound = React.lazy(() => import('@/page/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
