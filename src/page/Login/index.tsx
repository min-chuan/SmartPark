import { login } from '@/api/users';
import bg from '@/assets/bg.jpg';
import lgbg from '@/assets/lgbg.jpg';
import logo from '@/assets/logo.png';
import { setToken } from '@/store/login/authSlice';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './index.scss';

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  function handleLogin() {
    form
      .validateFields()
      .then(values => {
        setLoading(true);
        return login(values);
      })
      .then(res => {
        setLoading(false);
        const { token } = res.data;
        dispatch(setToken(token));
        navigate('/', { replace: true });
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }

  return (
    <div className="login" style={{ backgroundImage: `url(${bg})` }}>
      <div className="lgbg" style={{ backgroundImage: `url(${lgbg})` }}>
        <div className="part">
          <div className="title">
            <img className="logo" src={logo} width={100} alt="logo" />
            <h1>朋远智慧园区管理平台</h1>
          </div>
          <Form name="basic" form={form} className="login-form">
            <Form.Item name="username" rules={[{ required: true, message: '用户名不能为空' }]}>
              <Input prefix={<UserOutlined />} placeholder="请输入您的用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '密码不能为空' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="请输入您的密码" />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                onClick={handleLogin}
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
