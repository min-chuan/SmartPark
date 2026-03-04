import { Breadcrumb } from 'antd';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import type { MenuItem } from '../../api/users';
import type { RootState } from '../../store';

function MyBreadcrumb() {
  const location = useLocation();
  const menuList = useSelector((state: RootState) => state.auth.menuList);

  const items: ItemType[] = useMemo(() => {
    const result: ItemType[] = [];
    function getItems(list: MenuItem[], path: string, result: ItemType[] = []) {
      const item = list.find(item => path.startsWith(item.key));
      if (item) {
        result.push({ title: item.label });
        if (item.children) {
          getItems(item.children, path, result);
        }
      }
    }
    getItems(menuList, location.pathname, result);
    return result;
  }, [location.pathname, menuList]);

  return (
    <div className="my-breadcrumb mt mb">
      <Breadcrumb items={items} />
    </div>
  );
}

export default MyBreadcrumb;
