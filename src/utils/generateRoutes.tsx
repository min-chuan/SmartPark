import type { MenuItem } from '@/api/users';
import type { RouteObject } from 'react-router-dom';
import { componentMap } from '../router/routerMap';
function generateRoutes(menuList: MenuItem[]): RouteObject[] {
  const routes = menuList.map(item => {
    const hasChildren = item.children && item.children.length > 0;
    const route: RouteObject = {
      path: item.key,
      element: hasChildren ? null : componentMap[item.key],
    };
    if (hasChildren) {
      route.children = generateRoutes(item.children!);
    }
    return route;
  });
  return routes;
}
export default generateRoutes;

/*
{
    path: '/estate',
    children: [
      {
        path: '/estate/tenement',
        element: <Tenement />,
      }
    ]
  },

  {
    key: '/estate',
    children: [
      {
        key: '/estate/tenement',
      },
      {
        key: '/estate/room',
      },
      {
        key: '/estate/car',
      },
    ],
  },
  */
