import logo from '@/assets/logo.png';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { getMenu } from '../../api/users';
import icons from './iconList';
import './index.scss';

type MenuItem = Required<MenuProps>['items'][number];

// API 返回的菜单项数据结构
interface MenuItemFromAPI {
  icon?: string;
  label: string;
  key: string;
  children?: MenuItemFromAPI[];
}

function NavLeft() {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);

  function getMenuData() {
    getMenu()
      .then(res => {
        // 转换 API 数据为 antd Menu 需要的格式
        if (res.data) {
          const transformedData = transformMenuData(res.data);
          setMenuData(transformedData);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  function transformMenuData(data: MenuItemFromAPI[]): MenuItem[] {
    return data.map(item => ({
      key: item.key,
      label: item.label,
      icon: item.icon ? icons[item.icon] : null,
      children: item.children ? transformMenuData(item.children) : undefined,
    }));
  }

  useEffect(() => {
    getMenuData();
  }, []);

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
      />
    </div>
  );
}

export default NavLeft;
