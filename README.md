# li-flag

## `npm install`

## `npm start`

## 规范

- 使用 styled-components 用 **Styled_ButtonBox** 来和普通组件区分
- 组件头部引入顺序：a. 先外部依赖; b. 类型和方法; c. 组件 和 styled 和 常量

- 注释
  TODO => 表示需要实现，但目前还未实现的功能

  XXX => 勉强可以工作，但是性能差等原因

  FIXME => 代码是错误的，不能工作，需要修复

  有些外部导出的变量函数用 【/\*\* \*/】来注释，看这样 vscode 才有提示信息

```js
// 如
import React, { useState, useContext } from 'react';
import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { useAppDispatch } from '@/app/hooks';
import { toggleItemCompletedStatus } from '@/features/todo/todoSlice';
import { EveryDayContext } from '@/views/EveryDay';

import { Item, ItemContent } from './Styles';
import { EditNode } from './EditNode';
```

## 在线文档地址

<https://docs.qq.com/desktop/mydoc/folder/IcgRghEPvVbH>

## src

components 公共组件\
styles 公共样式\
utils 公用函数处理（时间，小数等等）\
views 页面

## git commit 注释

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

## styled-components 的文章

vscode: 下载 vscode-styled-components 这个插件有高亮提示\
<https://styled-components.com/docs/basics#getting-started>

## react-beautiful-dnd 拖拽库

中文文档: https://github.com/chinanf-boy/react-beautiful-dnd-zh \
ts 项目参考：<https://github1s.com/cowienduckie/react-beautiful-dnd-sample/blob/HEAD/src/App.tsx#L14>

## redux-toolkit 文档

redux-toolkit: <https://cn.redux.js.org/redux-toolkit/overview/#%E5%8C%85%E5%90%AB%E4%BA%86%E4%BB%80%E4%B9%88> \
Redux 通常与 React-Redux 库一起使用，把 Redux 和 React 集成在一起
Redux Toolkit 是编写 Redux 逻辑的推荐方式

## slate.js 富文本编辑器, 项目里 ListItem 组件使用其模型控制字体

文档: <https://docs.slatejs.org/>

## React-Contexify 右键菜单文档

<https://fkhadra.github.io/react-contexify>

## React Router v6 路由文档

<https://baimingxuan.github.io/react-router6-doc/start/tutorial>
