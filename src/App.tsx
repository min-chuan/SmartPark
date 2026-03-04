import { getMenu } from '@/api/users';
import { routes } from '@/router';
import { setMenuList } from '@/store/login/authSlice';
import type { Router } from '@remix-run/router';
import { Spin } from 'antd';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.scss';
import type { RootState } from './store';
import generateRoutes from './utils/generateRoutes';
function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [router, setRouter] = useState<Router | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        setRouter(createBrowserRouter(routes));
      }, 0);
      return;
    }
    const loadMenu = async () => {
      try {
        const res = await getMenu();
        if (res.data) {
          const menuList = res.data;
          dispatch(setMenuList(menuList));
          const dynamicRoutes = generateRoutes(menuList);
          const newRoutes = [...routes];
          newRoutes[0].children = dynamicRoutes;
          // 如果第一个路由有子路由，添加一个默认重定向到第一个子路由
          if (newRoutes[0].children && newRoutes[0].children.length > 0) {
            const firstRoute = newRoutes[0].children[0];
            newRoutes[0].children.unshift({
              index: true,
              element: <Navigate to={firstRoute.path!} replace />,
            });
          }
          const newRouter = createBrowserRouter(newRoutes);
          setRouter(newRouter);
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadMenu();
  }, [token]);

  if (!router) {
    return <Spin> </Spin>;
  }

  return (
    <Suspense fallback={<Spin> </Spin>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
