import { routes } from '@/router';
import type { Router } from '@remix-run/router';
import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import type { RootState } from './store';
import generateRoutes from './utils/generateRoutes';

function App() {
  const menuList = useSelector((state: RootState) => state.auth.menuList);
  const [router, setRouter] = useState<Router | null>(null);
  useEffect(() => {
    const dynamicRoutes = generateRoutes(menuList);
    const newRoutes = [...routes];
    newRoutes[0].children = dynamicRoutes;
    const newRouter = createBrowserRouter(newRoutes);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRouter(newRouter);
  }, [menuList]);

  if (!router) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
