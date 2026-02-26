import Mock from 'mockjs';
const baseURL = import.meta.env.VITE_API_URL;

Mock.mock(`${baseURL}/login`, 'post', options => {
  const { username, password } = JSON.parse(options.body);
  if (username === 'admin' && password === 'admin123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        username: 'admin',
        token: 'mocktokenadmin123456',
      },
    };
  } else if (username === 'manager' && password === 'manager123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        username: 'manager',
        token: 'mocktokenmanager123456',
      },
    };
  } else if (username === 'user' && password === 'user123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        username: 'user',
        token: 'mocktokenuser123456',
      },
    };
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
    };
  }
});
