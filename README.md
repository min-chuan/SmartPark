# 🏢 朋远智慧园区 - 后台管理系统

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.3.1-purple)
![Ant Design](https://img.shields.io/badge/Ant%20Design-6.3.1-red)
![License](https://img.shields.io/badge/License-MIT-green)

**朋远智慧园区**是一个现代化的园区后台管理系统，为园区管理者提供全面的数字化管理解决方案。系统涵盖了物业管理、财务管理、设备监控、能源管理等多个核心模块，帮助园区实现高效、智能的运营管理。

## 🌐 在线演示

- **演示地址**: http://223.6.253.39/
- **测试账号**:
  - 管理员: `admin` / `admin123456`
  - 经理: `manager` / `manager123456`
  - 普通用户: `user` / `user123456`

## ✨ 核心特性

- 🎯 **多角色权限管理**：支持管理员、经理、用户三级权限体系
- 📊 **数据可视化**：集成ECharts，实时展示园区运营数据
- 🔄 **动态菜单**：基于角色权限的动态路由和菜单生成
- 📱 **响应式设计**：适配各种屏幕尺寸
- 🛡️ **安全认证**：JWT Token认证，按钮级权限控制
- 📈 **模块化架构**：清晰的模块划分，易于扩展和维护

## 🛠️ 技术栈

### 前端技术

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **UI组件库**: Ant Design 6
- **状态管理**: Redux Toolkit + React Redux
- **路由管理**: React Router DOM 6
- **HTTP客户端**: Axios
- **图表库**: ECharts + echarts-for-react
- **工具库**: Day.js, FileSaver, XLSX

### 开发工具

- **代码规范**: ESLint + Prettier
- **Git钩子**: Husky + Commitlint
- **Mock数据**: Mock.js
- **CSS预处理器**: Sass

## 🚀 快速开始

### 环境准备

1. 安装 Node.js (>= 18.0.0)
2. 安装 Git
3. 推荐使用 VS Code 作为开发工具

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install

# 或使用 yarn
yarn install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 代码检查

```bash
# ESLint 检查
npm run lint

# 代码格式化
npm run format

# 检查代码格式
npm run format:check
```

### 构建生产版本

```bash
npm run build
```

构建产物位于 `dist` 目录

### 预览构建结果

```bash
npm run preview
```

## 📱 功能模块

| 模块         | 功能说明                                     |
| ------------ | -------------------------------------------- |
| **仪表盘**   | 园区运营数据概览、实时监控图表、关键指标展示 |
| **用户管理** | 用户列表查看、用户信息管理、角色权限分配     |
| **物业管理** | 租户管理、房间管理、车位管理                 |
| **维修管理** | 报修工单处理、维修进度跟踪、历史记录查询     |
| **财务管理** | 合同管理、退租管理、账单管理                 |
| **商户管理** | 商户入驻审核、商户信息管理、合同管理         |
| **运营管理** | 内容管理、评论管理、数据统计                 |
| **设备管理** | 设备监控、维护保养、故障处理                 |
| **能源管理** | 能耗监控、使用分析、节能优化                 |
| **系统设置** | 参数配置、权限管理、数据备份                 |
| **个人中心** | 个人信息、密码修改、操作日志                 |

## 🔐 权限系统

### 角色权限说明

| 角色         | 权限说明                                             |
| ------------ | ---------------------------------------------------- |
| **管理员**   | 拥有所有权限，包括系统设置、用户管理、数据查看和操作 |
| **经理**     | 拥有业务管理权限，可以管理租户、合同、维修等业务模块 |
| **普通用户** | 只能查看个人信息和相关业务数据，操作权限受限         |

### 权限控制级别

1. **菜单级权限**：根据角色动态生成可访问的菜单
2. **路由级权限**：控制页面访问权限
3. **按钮级权限**：控制具体操作按钮的显示和可用性

## 📁 项目结构

```
smartpark/
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── api/               # API接口定义
│   ├── assets/            # 静态资源
│   ├── components/        # 公共组件
│   ├── hooks/             # 自定义Hooks
│   ├── mock/              # Mock数据
│   ├── page/              # 页面组件（11个模块）
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   └── utils/             # 工具函数
├── .env                    # 环境变量
├── package.json           # 项目依赖
├── vite.config.ts         # Vite配置
└── tsconfig.json          # TypeScript配置
```

## 📝 开发规范

### Git 提交规范

项目使用 Conventional Commits 规范：

```bash
git commit -m "feat: 添加用户管理页面"
git commit -m "fix(auth): 修复登录token过期问题"
git commit -m "docs: 更新项目部署文档"
```

**类型说明**：

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动

## 🚢 部署指南

### 生产环境构建

```bash
npm run build
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/smartpark/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🤝 贡献指南

1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -m 'feat: add some feature'`)
4. 推送到分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request

## 📞 联系与支持

- **项目地址**: https://github.com/min-chuan/SmartPark
- **问题反馈**: [GitHub Issues](https://github.com/min-chuan/SmartPark/issues)
- **线上演示**: http://223.6.253.39/

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
