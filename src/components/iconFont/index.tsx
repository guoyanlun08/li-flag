import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';
// iconfont图标的js在线链接
const iconUrl = ['//at.alicdn.com/t/c/font_4429243_d01eejdhqlv.js'];
const CreateIcon = createFromIconfontCN({
  scriptUrl: iconUrl
});

// 通过name传入iconfont图标名字，其他属性保持和antd的Icon一样的属性
export default function IconFont({ name = '', ...resetProps }) {
  return (
    <Space>
      <CreateIcon type={name} {...resetProps} />
    </Space>
  );
}
