import type { MenuItem as MenuItemFromAPI } from '@/api/users';
import logo from '@/assets/logo.png';
import type { MenuInfo } from '@rc-component/menu/lib/interface';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMenu } from '../../api/users';
import { setMenuList } from '../../store/login/authSlice';
import icons from './iconList';
import './index.scss';

type MenuItem = Required<MenuProps>['items'][number];

function NavLeft() {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getMenuData() {
    getMenu()
      .then(res => {
        // 转换 API 数据为 antd Menu 需要的格式
        if (res.data) {
          const transformedData = transformMenuData(res.data);
          dispatch(setMenuList(res.data));
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

  function handleClick(info: MenuInfo) {
    navigate(info.key);
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
        onClick={handleClick}
      />
    </div>
  );
}

export default NavLeft;
