import Mock from 'mockjs';
const baseURL = import.meta.env.VITE_API_URL;

Mock.setup({
  timeout: '200-600', // 模拟网络延迟
});

Mock.Random.extend({
  phone: function () {
    const prefixs = ['13', '14', '15', '16', '17', '18', '19'];
    return this.pick(prefixs) + Mock.mock(/\d{9}/);
  },
});

const adminMenuList = [
  {
    icon: 'DashboardOutlined',
    label: '工作台',
    key: '/dashboard',
  },
  {
    icon: 'TeamOutlined',
    label: '租户管理',
    key: '/users',
    children: [
      {
        icon: 'UnorderedListOutlined',
        label: '租户列表',
        key: '/users/list',
      },
      {
        icon: 'UserAddOutlined',
        label: '新增租户',
        key: '/users/add',
      },
    ],
  },
  {
    icon: 'LaptopOutlined',
    label: '物业管理',
    key: '/estate',
    children: [
      {
        icon: 'InsertRowLeftOutlined',
        label: '楼宇管理',
        key: '/estate/tenement',
      },
      {
        icon: 'BankOutlined',
        label: '房间管理',
        key: '/estate/room',
      },
      {
        icon: 'TruckOutlined',
        label: '车辆信息',
        key: '/estate/car',
      },
    ],
  },
  {
    icon: 'ToolOutlined',
    label: '报修管理',
    key: '/repair',
  },
  {
    icon: 'DollarOutlined',
    label: '财务管理',
    key: '/finance',
    children: [
      {
        icon: 'ProfileOutlined',
        label: '合同管理',
        key: '/finance/contract',
      },
      {
        icon: 'FrownOutlined',
        label: '合同详情',
        key: '/finance/surrender',
        disabled: true,
      },
      {
        icon: 'FileTextOutlined',
        label: '账单管理',
        key: '/finance/bill',
      },
    ],
  },
  {
    icon: 'TransactionOutlined',
    label: '招商管理',
    key: '/merchants',
  },
  {
    icon: 'FundProjectionScreenOutlined',
    label: '运营管理',
    key: '/operation',
    children: [
      {
        icon: 'FundViewOutlined',
        label: '运营总览',
        key: '/operation/all',
      },
      {
        icon: 'ReadOutlined',
        label: '文章发布',
        key: '/operation/article',
      },
      {
        icon: 'CommentOutlined',
        label: '内容评论',
        key: '/operation/comments',
      },
    ],
  },
  {
    icon: 'ToolOutlined',
    label: '设备管理',
    key: '/equipment',
  },
  {
    icon: 'ThunderboltOutlined',
    label: '能源消耗',
    key: '/energy',
  },
  {
    icon: 'SettingOutlined',
    label: '系统设置',
    key: '/settings',
  },
  {
    icon: 'UserOutlined',
    label: '个人中心',
    key: '/personal',
  },
];

const userMenuList = [
  {
    icon: 'DashboardOutlined',
    label: '工作台',
    key: '/dashboard',
  },
  {
    icon: 'TeamOutlined',
    label: '租户管理',
    key: '/users',
    children: [
      {
        icon: 'UnorderedListOutlined',
        label: '租户列表',
        key: '/users/list',
      },
      {
        icon: 'UserAddOutlined',
        label: '新增租户',
        key: '/users/add',
      },
    ],
  },
  {
    icon: 'LaptopOutlined',
    label: '物业管理',
    key: '/estate',
    children: [
      {
        icon: 'InsertRowLeftOutlined',
        label: '楼宇管理',
        key: '/estate/tenement',
      },
      {
        icon: 'BankOutlined',
        label: '房间管理',
        key: '/estate/room',
      },
      {
        icon: 'TruckOutlined',
        label: '车辆信息',
        key: '/estate/car',
      },
    ],
  },
  {
    icon: 'ToolOutlined',
    label: '报修管理',
    key: '/repair',
  },
  {
    icon: 'ToolOutlined',
    label: '设备管理',
    key: '/equipment',
  },
  {
    icon: 'ThunderboltOutlined',
    label: '能源消耗',
    key: '/energy',
  },
  {
    icon: 'UserOutlined',
    label: '个人中心',
    key: '/personal',
  },
];

const managerMenuList = [
  {
    icon: 'DashboardOutlined',
    label: '工作台',
    key: '/dashboard',
  },
  {
    icon: 'TeamOutlined',
    label: '租户管理',
    key: '/users',
    children: [
      {
        icon: 'UnorderedListOutlined',
        label: '租户列表',
        key: '/users/list',
      },
      {
        icon: 'UserAddOutlined',
        label: '新增租户',
        key: '/users/add',
      },
    ],
  },
  {
    icon: 'LaptopOutlined',
    label: '物业管理',
    key: '/estate',
    children: [
      {
        icon: 'InsertRowLeftOutlined',
        label: '楼宇管理',
        key: '/estate/tenement',
      },
      {
        icon: 'BankOutlined',
        label: '房间管理',
        key: '/estate/room',
      },
      {
        icon: 'TruckOutlined',
        label: '车辆信息',
        key: '/estate/car',
      },
    ],
  },
  {
    icon: 'ToolOutlined',
    label: '报修管理',
    key: '/repair',
  },
  {
    icon: 'TransactionOutlined',
    label: '招商管理',
    key: '/merchants',
  },
  {
    icon: 'FundProjectionScreenOutlined',
    label: '运营管理',
    key: '/operation',
    children: [
      {
        icon: 'FundViewOutlined',
        label: '运营总览',
        key: '/operation/all',
      },
      {
        icon: 'ReadOutlined',
        label: '文章发布',
        key: '/operation/article',
      },
      {
        icon: 'CommentOutlined',
        label: '内容评论',
        key: '/operation/comments',
      },
    ],
  },
  {
    icon: 'ToolOutlined',
    label: '设备管理',
    key: '/equipment',
  },
  {
    icon: 'ThunderboltOutlined',
    label: '能源消耗',
    key: '/energy',
  },
  {
    icon: 'SettingOutlined',
    label: '系统设置',
    key: '/settings',
  },
  {
    icon: 'UserOutlined',
    label: '个人中心',
    key: '/personal',
  },
];

// 菜单接口
Mock.mock(`${baseURL}/menu`, 'get', () => {
  const token = sessionStorage.getItem('token');
  if (token === 'mocktokenadmin123456') {
    return {
      code: 200,
      message: '获取菜单成功',
      data: adminMenuList,
    };
  } else if (token === 'mocktokenmanager123456') {
    return {
      code: 200,
      message: '获取菜单成功',
      data: managerMenuList,
    };
  } else if (token === 'mocktokenuser123456') {
    return {
      code: 200,
      message: '获取菜单成功',
      data: userMenuList,
    };
  } else {
    return {
      code: 401,
      message: '未授权',
    };
  }
});

/* -----------------  登录接口 ---------------------*/
// 登录接口
Mock.mock(`${baseURL}/login`, 'post', options => {
  const data = JSON.parse(options.body);
  const { username, password } = data;
  console.log('登录接口请求参数', data);
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

/* -----------------  工作台接口 ---------------------*/
// 图表接口
Mock.mock(`${baseURL}/getEnergyList`, 'get', () => {
  return {
    code: 200,
    message: '请求成功',
    data: [
      {
        name: '煤',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '气',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: '油',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: '电',
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: '热',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
});

/* -----------------  租户列表接口 ---------------------*/
// 获取租户列表
Mock.mock(`${baseURL}/userList`, 'post', options => {
  const data = JSON.parse(options.body);
  const { pageSize } = data;
  console.log('获取租户列表请求参数:', data);
  return {
    code: 200,
    message: '请求成功',
    data: Mock.mock({
      [`list|${pageSize}`]: [
        {
          id: "@string('number', 6)",
          name: '@cname',
          'status|1': ['1', '2', '3'],
          tel: '@phone',
          email: '@email',
          'business|1': ['制造业', '互联网', '新媒体', '美业', '新能源', '物流', '电商'],
          creditCode: "@string('number', 18)",
          industryNum: "@string('number', 15)",
          organizationCode: "@string('upper',9)",
          legalPerson: '@cname',
        },
      ],
      total: 78,
    }),
  };
});

// 删除租户
Mock.mock(`${baseURL}/deleteUser`, 'post', options => {
  const data = JSON.parse(options.body);
  console.log('删除租户请求参数:', data);
  return {
    code: 200,
    message: '成功',
    data: '删除成功',
  };
});

// 批量删除租户
Mock.mock(`${baseURL}/batchDeleteUser`, 'post', options => {
  const data = JSON.parse(options.body);
  console.log('批量删除租户请求参数:', data);
  return {
    code: 200,
    message: '成功',
    data: '删除成功',
  };
});

// 编辑添加租户
Mock.mock(`${baseURL}/editUser`, 'post', options => {
  const data = JSON.parse(options.body);
  console.log('编辑添加租户请求参数:', data);
  return {
    code: 200,
    message: '成功',
    data: '操作成功',
  };
});

/* -----------------  房间管理接口 ---------------------*/
function generateRooms() {
  const rooms = [];
  for (let i = 0; i < 50; i++) {
    const floor = 1 + Math.floor(i / 6);
    const roomNumber = floor * 100 + (101 + (i % 6));
    rooms.push({
      roomNumber,
      decorationType: Mock.Random.pick(['毛坯', '精装']),
      area: Mock.Random.integer(70, 300),
      unitPrice: Mock.Random.integer(1, 3),
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    });
  }
  return rooms;
}
// 获取房间列表
Mock.mock(`${baseURL}/getRoomList`, 'post', options => {
  const data = JSON.parse(options.body);
  console.log('获取房间列表请求参数:', data);
  return {
    code: 200,
    message: '成功',
    data: {
      rooms: generateRooms(),
    },
  };
});

/* -----------------  合同管理接口 ---------------------*/
// 获取合同列表
Mock.mock(`${baseURL}/getContractList`, 'post', options => {
  const data = JSON.parse(options.body);
  const { pageSize } = data;
  console.log('获取合同列表请求参数:', data);
  return {
    code: 200,
    message: '成功',
    data: Mock.mock({
      [`list|${pageSize}`]: [
        {
          contractNo: '@string("number", 6)',
          'type|1': ['租赁合同', '自定义合同', '购买合同'],
          'name|1': ['房屋租赁合同通用模板', '车位租赁合同通用模板', '商业房产买卖合同'],
          'startDate|1': ['2023-01-01', '2023-03-05', '2023-04-01'],
          'endDate|1': ['2024-01-01', '2024-03-05', '2024-04-01'],
          'jia|1': ['万物科技有限公司', '大鱼网络科技', '六六信息技术有限公司'],
          yi: '天明物业有限公司',
          'status|1': ['1', '2', '3'],
        },
      ],
      total: 54,
    }),
  };
});
