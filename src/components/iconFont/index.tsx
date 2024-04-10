import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';
// iconfont图标的js在线链接
const iconUrl = ['//at.alicdn.com/t/c/font_4429243_9ev7vd7p9co.js'];
const CreateIcon = createFromIconfontCN({
  scriptUrl: iconUrl
});

// 通过name传入iconfont图标名字，其他属性保持和antd的Icon一样的属性 -> https://ant.design/components/icon-cn#api
export default function IconFont({ name = '', ...resetProps }) {
  return (
    <Space>
      <CreateIcon type={name} {...resetProps} />
    </Space>
  );
}
