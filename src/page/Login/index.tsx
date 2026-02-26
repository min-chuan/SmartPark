import bg from '@/assets/bg.jpg';
import lgbg from '@/assets/lgbg.jpg';
import logo from '@/assets/logo.png';
import './index.scss';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

function Login() {
  const [form] = Form.useForm();

  function handleLogin() {
    form
      .validateFields()
      .then(values => {
        console.log(values);
      })
      .catch(err => {
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
