# `npm install`

# `npm start`

# 规范
- 使用styled-components 用 **Styled_ButtonBox** 来和普通组件区分

# 在线文档地址
https://docs.qq.com/desktop/mydoc/folder/IcgRghEPvVbH

# src
components 公共组件\
styles 公共样式\
utils 公用函数处理（时间，小数等等）\
views 页面

# git commit 注释

feat: 新功能\
fix: 修补 bug\
docs: 文档\
style: 格式（不影响代码运行的变动）\
refactor: 重构 \
perf: 改善性能 \
test: 测试 \
build: 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）\
ci: 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 \
chore: 变更构建流程或辅助工具 \
revert: 代码回退

# styled-components 的文章

vscode: 下载 vscode-styled-components 这个插件有高亮提示\
https://juejin.cn/post/7074600131126886437

# react-beautiful-dnd 拖拽库

中文文档: https://github.com/chinanf-boy/react-beautiful-dnd-zh \
ts 项目参考：https://github1s.com/cowienduckie/react-beautiful-dnd-sample/blob/HEAD/src/App.tsx#L14

# redux-toolkit 文档
redux-toolkit: https://cn.redux.js.org/redux-toolkit/overview/#%E5%8C%85%E5%90%AB%E4%BA%86%E4%BB%80%E4%B9%88 \
Redux 通常与 React-Redux 库一起使用，把 Redux 和 React 集成在一起
Redux Toolkit 是编写 Redux 逻辑的推荐方式

# slate.js 富文本编辑器, 项目里 ListItem 组件使用其模型控制字体

文档: https://docs.slatejs.org/

# TODO

|  TODO项 (完成项, 在这用~~删除线~~横划, 不要删掉.)  | 提出人  | 处理人 |
|  ----  | ----  | ---- |
| 梳理一下, 接下来的模块  | allen | yellowB, allen |
| App.tsx 里的 函数名语义化一下, 不太明确  | allen | yellowB |
| 登录界面，大致逻辑，在线文档里的流程图 | allen | yellowB |
| 项目里使用 styled-com 的标签, 命名格式需要全部统一一下（已确定，superB => EveryDay, SiderMenu; allen => ToolsBar） | allen | yellowB,allen |
| ~~redux 没有发挥真正作用, 参数传递多层(爷->孙), 需要处理~~(本身没什么问题, 原用useContent处理)  | allen | allen |
| feat: Toolbar 组件工具样式需要增加, 熟悉一下 slate的使用  | allen | yellowB |
| ~~Toolbar 组件文本选中, 再点击同 ListItem其他区域(取消拖蓝), 会有 Toolbar会有闪现问题~~  | allen | allen |
| ~~sideBar侧边栏展开收起控制移动到外层容器~~  | superB | superB |
| bug: ListItem，的拖拽标签，快速拖拽时，标签不会消失，需要再去碰一次，才消失  | allen | xxx |
| feat: 近期完成模块开发 | allen | allen |
| ~~feat: 登录界面基本框架样式开发~~ | superB | superB |
