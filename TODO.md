# TODO

> p0, p1, p2 表优先级，p0 最高
> todo 备注：【已完成】勾选 todo, 后面备注处理人。【处理中】todo 后备注 ————（xxx 处理中）。【待处理】代表指定人处理

例：

- [ ] 待处理的 todo ———— p0, (待处理 superB)
- [ ] 处理中的 todo ———— p0, (处理中 superB)
- [x] 已完成的 todo ———— p0, super

---

- [x] 梳理一下, 接下来的模块 ———— yb, allen
- [x] App.tsx 里的 函数名语义化一下, 不太明确 ———— yb
- [x] 登录界面，大致逻辑，在线文档里的流程图 ———— yellowB
- [x] 项目里使用 styled-com 的标签, 命名格式需要全部统一一下（已确定，superB => EveryDay, SiderMenu; allen => NavTools）———— yellowB,allen
- [x] redux 没有发挥真正作用, 参数传递多层(爷->孙), 需要处理~~(本身没什么问题, 原用 useContent 处理) ———— allen
- [x] feat: Toolbar 组件工具样式需要增加, 熟悉一下 slate 的使用 ———— yellowB
- [x] Toolbar 组件文本选中, 再点击同 ListItem 其他区域(取消拖蓝), 会有 Toolbar 会有闪现问题 ———— allen
- [x] sideBar 侧边栏展开收起控制移动到外层容器 ———— superB
- [x] bug: ListItem，的拖拽标签，快速拖拽时，标签不会消失，需要再去碰一次，才消失 ———— allen
- [x] feat: 近期完成模块开发 ———— allen
- [x] feat: 登录界面基本框架样式开发 ———— superB
- [x] feat: 存储 store 的 todo 数据格式需要修改，且项目涉及的组件都要调整(02/03 必须处理) ———— allen
- [x] feat: 近期完成模块的 list 列表，看是否重新设计；还是用通用 ListItem 组件，若用 ListItem 组件，则需要重新设计 ———— allen
- [x] feat: 封装下项目所用的 axios 请求，非登录请求携带 token。token 存储 localstorage ———— boss huang
- [x] feat: 先用账户密码进行登录，注册则可能需要个确认密码输入。后期应该会用手机号码注册，且用验证码注册登录。 ———— superB
- [x] feat: 登录注册的接口。 ———— HB
- [x] feat: todoItem 增删改查接口。 ———— allen
- [x] feat: 调研右键菜单库，目前用途是删除可编辑的 todoItem。需简单好用 ———— superB
- [x] feat: 每个模块数据溢出，overflow 设置，且滚动条样式调整(看是否设置全局滚动条样式)未设置全局滚动条样式, 这里不显示滚动条 ———— allen
- [x] bug: 第一个 item 的 toolbar 显示被 title 覆盖（原因容器设置了 overflow-y:auto 被遮挡）———— allen
- [x] bug: 右键菜单需要已组件形式引入，且应是整个【每日模块】用一个右键菜单组件，不然导致多点右键，上一个渲染还在. ———— HB
- [x] list 的 order 从 0 开始 ———— allen
- [x] router 引入 ———— allen
- [x] bug: 长文字输入 item 被换行，效果应该像 input 一样 ———— superB
- [x] feat: ListItem 中的 checkbox disabled 样式调整 ———— allen
- [x] todoItem 增删改查测试(测试先清 TodoItem 库) ！！！！ ———— allen, HB
- [x] 12 点固定刷新每日模块 ———— allen
- [x] navTools 激活状态样式 ———— allen
- [x] 项目里 type interface 定义首字母没大写，大写一下 ———— allen
- [x] 请求器需要优化响应处理 ———— allen
- [x] 对接口错误的处理 ———— allen
- [x] 个人信息页 ———— allen
- [ ] 右键菜单新增 ———— p0, (待处理 superB)
- [ ] 登录注册表单应有前端前置校验。简单处理：长度校验即可 ———— p0, (待处理 superB)
- [ ] 每日模块的标题，背景颜色支持自定义 ———— p2
