import logo from '@/assets/logo.png';
import type { RootState } from '@/store';
import type { MenuInfo } from '@rc-component/menu/lib/interface';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import icons from './iconList';
import './index.scss';

import type { MenuItem as MenuItemFromAPI } from '@/api/users';
type MenuItem = Required<MenuProps>['items'][number];

function NavLeft() {
  const navigate = useNavigate();
  const menuList = useSelector((state: RootState) => state.auth.menuList);

  function handleClick(info: MenuInfo) {
    navigate(info.key);
  }

  function transformMenuData(data: MenuItemFromAPI[]): MenuItem[] {
    return data.map(item => ({
      key: item.key,
      label: item.label,
      icon: item.icon ? icons[item.icon] : null,
      children: item.children ? transformMenuData(item.children) : undefined,
    }));
  }

  const menuData = useMemo(() => {
    return transformMenuData(menuList);
  }, [menuList]);

  return (
    <div className="navleft">
      <div className="logo">
        <img src={logo} alt="logo" width={20} />
        <h1>朋远智慧园区</h1>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={menuData}
        onClick={handleClick}
      />
    </div>
  );
}

export default NavLeft;
