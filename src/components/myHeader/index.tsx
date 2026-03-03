import { DownOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../store/login/authSlice';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <a target="_blank">个人中心</a>,
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: <a target="_blank">退出登录</a>,
    icon: <PoweroffOutlined />,
  },
];

const MyHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onClick({ key }: { key: string }) {
    if (key === '1') {
      navigate('/personal');
    } else if (key === '2') {
      dispatch(clearToken());
      sessionStorage.clear();
    }
  }

  return (
    <div className="my-header">
      <Dropdown menu={{ items, onClick }}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            欢迎您，{sessionStorage.getItem('username') || '用户'}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default MyHeader;
