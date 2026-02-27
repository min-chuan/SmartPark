import MyBreadcrumb from '@/components/myBreadcrumb';
import MyHeader from '@/components/myHeader';
import NavLeft from '@/components/navLeft';
import { Layout, theme } from 'antd';
import React, { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }} className="home">
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <NavLeft />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <MyHeader />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <MyBreadcrumb />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
