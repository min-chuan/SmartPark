# Prettier 代码格式化配置说明

## 已完成的配置

### 1. 安装的依赖

- `prettier` - 代码格式化工具
- `eslint-config-prettier` - 解决 ESLint 与 Prettier 规则冲突
- `eslint-plugin-prettier` - 将 Prettier 作为 ESLint 规则运行

### 2. 创建的配置文件

- `.prettierrc` - Prettier 格式化规则配置
- `.prettierignore` - 指定不需要格式化的文件
- `.vscode/settings.json` - VSCode 编辑器设置
- `.vscode/extensions.json` - VSCode 扩展推荐

### 3. 更新的配置文件

- `eslint.config.js` - 集成了 Prettier 插件
- `package.json` - 添加了格式化脚本

## 如何使用

### 自动格式化（推荐）

1. **保存时自动格式化**：在 VSCode 中按 `Ctrl + S` 保存文件时，会自动格式化代码
2. **手动触发格式化**：在文件中按 `Shift + Alt + F`（Windows）或 `Shift + Option + F`（Mac）

### 命令行格式化

```bash
# 检查代码格式
npm run format:check

# 格式化所有代码
npm run format

# 只格式化特定文件
npx prettier --write src/App.tsx

# 检查特定文件格式
npx prettier --check src/App.tsx
```

### 项目脚本

```bash
# 开发服务器
npm run dev

# 代码检查
npm run lint

# 代码格式化
npm run format

# 检查格式化
npm run format:check
```

## 格式化规则

当前配置的格式化规则：

- **分号**：使用分号
- **引号**：使用单引号（JSX 属性使用双引号）
- **行宽**：最大 100 个字符
- **缩进**：2 个空格
- **尾随逗号**：ES5 风格
- **括号间距**：true
- **箭头函数参数括号**：avoid（单个参数时省略括号）
- **行尾序列**：LF

## VSCode 扩展

推荐安装的 VSCode 扩展：

1. **Prettier - Code formatter** (esbenp.prettier-vscode)
2. **ESLint** (dbaeumer.vscode-eslint)
3. **TypeScript and JavaScript Language Features** (ms-vscode.vscode-typescript-next)

这些扩展已在 `.vscode/extensions.json` 中配置，VSCode 会在打开项目时提示安装。

## 注意事项

1. **文件类型支持**：配置支持 TypeScript、JavaScript、JSX、TSX、CSS、SCSS、JSON、HTML、Markdown 等文件
2. **忽略文件**：构建输出、依赖、环境变量等文件已被排除在格式化之外
3. **与 ESLint 集成**：Prettier 已与 ESLint 集成，保存时会同时运行 ESLint 修复和代码格式化
4. **导入排序**：保存时会自动整理导入语句

## 自定义配置

如需修改格式化规则，请编辑 `.prettierrc` 文件。常用选项：

```json
{
  "semi": false, // 不使用分号
  "singleQuote": false, // 使用双引号
  "printWidth": 80, // 行宽改为 80
  "tabWidth": 4, // 缩进改为 4 个空格
  "trailingComma": "all" // 所有可能的地方都添加尾随逗号
}
```

## Git Commit 前自动格式化

项目已配置 Husky pre-commit 钩子，在 `git commit` 时会自动：

1. **格式化暂存的文件**：使用 Prettier 格式化所有暂存的代码文件
2. **重新添加到暂存区**：将格式化后的文件重新暂存
3. **运行 ESLint 检查**：确保代码质量

### 验证 Git 钩子

```bash
# 1. 创建一个测试文件并故意破坏格式
echo "const test='hello'" > test.ts

# 2. 添加到暂存区
git add test.ts

# 3. 尝试提交（会自动格式化）
git commit -m "test"

# 4. 检查文件是否被格式化
cat test.ts

# 5. 清理测试文件
rm test.ts
```

## 验证配置

要验证配置是否正常工作：

1. 打开任意 `.tsx` 文件
2. 故意写一些格式不规范的代码
3. 按 `Ctrl + S` 保存
4. 观察代码是否自动格式化

## 故障排除

如果保存时没有自动格式化：

1. 确保已安装推荐的 VSCode 扩展
2. 检查 VSCode 右下角是否显示 "Prettier" 作为默认格式化工具
3. 重启 VSCode
4. 运行 `npm run format` 手动格式化所有文件

如果 git commit 前没有自动格式化：

1. 确保 Husky 已安装：`npm run prepare`
2. 检查 `.husky/pre-commit` 文件是否存在且可执行
3. 确保文件已添加到暂存区：`git add <file>`

## 行尾序列（LF/CRLF）配置

项目已配置为使用 **LF（Unix 风格）** 行尾序列，这是现代 JavaScript/TypeScript 项目的标准。

### 已完成的配置：

1. **Git 配置**：设置了 `core.autocrlf=false` 禁用自动转换
2. **.gitattributes 文件**：指定了各种文件类型的行尾规则
3. **Prettier 配置**：`.prettierrc` 中设置了 `"endOfLine": "lf"`

### 为什么使用 LF？

- **跨平台一致性**：确保在 Windows、macOS 和 Linux 上保持一致
- **工具兼容性**：Prettier、ESLint 等工具默认使用 LF
- **Git 友好**：减少不必要的行尾更改冲突

### 如果看到 "LF will be replaced by CRLF" 警告：

这表示 Git 的行尾配置有问题。已通过以下方式解决：

1. `git config core.autocrlf false` - 禁用自动转换
2. 创建 `.gitattributes` 文件 - 明确指定行尾规则

现在所有文本文件都将使用 LF 行尾，确保跨平台一致性。
