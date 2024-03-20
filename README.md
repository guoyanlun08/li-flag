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

## TODO

| TODO 项 (完成项, 在这用~~删除线~~横划, 不要删掉.)                                                                           | 提出人   | 处理人         |
| --------------------------------------------------------------------------------------------------------------------------- | -------- | -------------- |
| ~~梳理一下, 接下来的模块~~                                                                                                  | allen    | yellowB, allen |
| ~~App.tsx 里的 函数名语义化一下, 不太明确~~                                                                                 | allen    | yellowB        |
| ~~登录界面，大致逻辑，在线文档里的流程图~~                                                                                  | allen    | yellowB        |
| ~~项目里使用 styled-com 的标签, 命名格式需要全部统一一下（已确定，superB => EveryDay, SiderMenu; allen => NavTools）~~      | allen    | yellowB,allen  |
| ~~redux 没有发挥真正作用, 参数传递多层(爷->孙), 需要处理~~(本身没什么问题, 原用 useContent 处理)                            | allen    | allen          |
| ~~feat: Toolbar 组件工具样式需要增加, 熟悉一下 slate 的使用~~                                                               | allen    | yellowB        |
| ~~Toolbar 组件文本选中, 再点击同 ListItem 其他区域(取消拖蓝), 会有 Toolbar 会有闪现问题~~                                   | allen    | allen          |
| ~~sideBar 侧边栏展开收起控制移动到外层容器~~                                                                                | superB   | superB         |
| ~~bug: ListItem，的拖拽标签，快速拖拽时，标签不会消失，需要再去碰一次，才消失~~                                             | allen    | allen          |
| ~~feat: 近期完成模块开发~~                                                                                                  | allen    | allen          |
| ~~feat: 登录界面基本框架样式开发~~                                                                                          | superB   | superB         |
| ~~feat: 存储 store 的 todo 数据格式需要修改，且项目涉及的组件都要调整(02/03 必须处理)~~                                     | allen    | allen          |
| ~~feat: 近期完成模块的 list 列表，看是否重新设计；还是用通用 ListItem 组件，若用 ListItem 组件，则需要重新设计~~            | allen    | allen          |
| ~~feat: 封装下项目所用的 axios 请求，非登录请求携带 token。token 存储 localstorage~~                                        | allen    | boss huang     |
| ~~feat: 先用账户密码进行登录，注册则可能需要个确认密码输入。后期应该会用手机号码注册，且用验证码注册登录。~~                | allen    | superB         |
| ~~feat: 登录注册的接口。~~                                                                                                  | allen    | HB             |
| ~~feat: todoItem 增删改查接口。~~                                                                                           | allen    | allen          |
| ~~feat: 调研右键菜单库，目前用途是删除可编辑的 todoItem。需简单好用~~                                                       | allen    | superB         |
| ~~feat: 每个模块数据溢出，overflow 设置，且滚动条样式调整(看是否设置全局滚动条样式)未设置全局滚动条样式, 这里不显示滚动条~~ | allen    | allen          |
| ~~bug: 第一个 item 的 tooltar 显示被 title 覆盖（原因容器设置了 overflow-y:auto 被遮挡）~~                                  |          | allen          |
| ~~bug: 右键菜单需要已组件形式引入，且应是整个【每日模块】用一个右键菜单组件，不然导致多点右键，上一个渲染还在.~~            | allen    | HB             |
| ~~list 的 order 从 0 开始~~                                                                                                 | allen    | allen          |
| ~~router 引入~~                                                                                                             | allen    | allen          |
| bug: 长文字输入 item 被换行，效果应该像 input 一样                                                                          |          | ???            |
| feat: ListItem 中的 checkbox disabled 样式调整                                                                              | allen    | ???            |
| todoItem 增删改查测试(测试先清 TodoItem 库) ！！！！                                                                        |          | allen, HB      |
| feat: 每日模块的标题，背景颜色支持自定义                                                                                    | superBoy | ???            |
| 12 点固定刷新每日模块                                                                                                       | allen    | allen          |
| ~~navTools 激活状态样式~~                                                                                                   | allen    | allen          |
| ~~项目里 type interface 定义首字母没大写，大写一下~~                                                                        | allen    | allen          |
| ~~请求器需要优化响应处理~~                                                                                                  | allen    | allen          |
| ~~对接口错误的处理~~                                                                                                        | allen    | allen          |
| 调研前端有没有全局捕获错误的方法                                                                                            | allen    | allen          |
| 右键菜单新增                                                                                                                | allen    | superB         |
| 登录注册表单应有前端前置校验                                                                                                | allen    | superB         |
