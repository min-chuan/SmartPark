# Git 提交规范指南

## 概述

本项目使用 Conventional Commits 规范来确保提交信息的清晰性和一致性。所有提交在推送到远程仓库前都会自动检查是否符合规范。

## 安装的检查工具

1. **commitlint** - 检查提交信息是否符合 Conventional Commits 规范
2. **husky** - Git 钩子管理工具，在提交时自动运行检查
3. **ESLint** - 代码质量检查（在 pre-commit 阶段运行）

## 提交信息格式

### 基本格式
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 类型（Type）
必须使用以下类型之一：

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 添加用户登录功能` |
| `fix` | 修复 bug | `fix: 修复登录页面样式问题` |
| `docs` | 文档更新 | `docs: 更新 README 安装说明` |
| `style` | 代码格式调整（不影响功能） | `style: 格式化代码缩进` |
| `refactor` | 代码重构 | `refactor: 重构用户认证模块` |
| `test` | 测试相关 | `test: 添加用户服务单元测试` |
| `chore` | 构建过程或辅助工具变动 | `chore: 更新依赖包版本` |
| `perf` | 性能优化 | `perf: 优化图片加载性能` |
| `ci` | CI/CD 相关 | `ci: 配置 GitHub Actions 工作流` |
| `revert` | 回滚提交 | `revert: 回滚错误的用户认证更改` |
| `build` | 构建相关 | `build: 更新 webpack 配置` |
| `wip` | 工作进行中（可选） | `wip: 用户个人资料页面开发中` |

### 范围（Scope，可选）
用于指定修改的范围，如模块、组件或文件：
- `feat(auth): 添加 OAuth 登录支持`
- `fix(ui): 修复按钮点击区域问题`

### 描述（Description）
- 使用祈使句，现在时态
- 首字母小写
- 不要以句号结尾
- 简洁明了，描述更改内容

### 正文（Body，可选）
详细描述更改的原因、实现细节或相关背景信息。

### 页脚（Footer，可选）
用于引用问题、破坏性变更等：
- `BREAKING CHANGE: 移除旧的 API 接口`
- `Closes #123`

## 示例

### 简单提交
```
feat: 添加用户注册页面
```

### 带范围的提交
```
fix(api): 修复用户数据查询接口
```

### 带正文的提交
```
feat: 实现深色模式支持

- 添加主题切换组件
- 更新所有页面支持深色模式
- 添加用户偏好设置存储

Closes #45
```

## 提交流程

1. **暂存更改**
   ```bash
   git add .
   ```

2. **提交更改**
   ```bash
   git commit -m "type: 描述信息"
   ```

3. **自动检查**
   - pre-commit: 运行 ESLint 检查代码质量
   - commit-msg: 检查提交信息格式

4. **如果检查失败**
   - 根据错误信息修正问题
   - 重新提交

## 常见错误和解决方法

### 错误：`type may not be empty`
**原因**：提交信息缺少类型前缀
**解决**：添加正确的类型前缀，如 `feat: `、`fix: ` 等

### 错误：`subject may not be empty`
**原因**：提交信息缺少描述
**解决**：在类型后添加描述信息

### 错误：`type must be one of [...]`
**原因**：使用了不支持的类型
**解决**：使用允许的类型列表中的类型

### 错误：ESLint 检查失败
**原因**：代码存在语法或格式问题
**解决**：根据 ESLint 错误信息修复代码

## 配置说明

### commitlint 配置
配置文件：`commitlint.config.js`
- 基于 `@commitlint/config-conventional`
- 扩展了额外的类型支持
- 配置了中文注释

### husky 钩子
- `pre-commit`: 运行 ESLint 检查
- `commit-msg`: 运行 commitlint 检查

## 开发建议

1. **频繁提交**：小而专注的提交更容易理解和审查
2. **清晰描述**：提交信息应该清楚地说明做了什么和为什么
3. **使用范围**：当修改特定模块时，使用范围来提供更多上下文
4. **保持一致性**：整个团队使用相同的提交规范

## 参考资料

- [Conventional Commits 规范](https://www.conventionalcommits.org/)
- [commitlint 文档](https://github.com/conventional-changelog/commitlint)
- [husky 文档](https://typicode.github.io/husky/)