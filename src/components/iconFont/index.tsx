import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';
const iconUrl = ['//at.alicdn.com/t/c/font_4429243_13a7lsv8ljt.js'];
const CreateIcon = createFromIconfontCN({
  scriptUrl: iconUrl
});
interface IProps {
  name: string;
}

export default function IconFont(props: IProps) {
  return (
    <Space>
      {/* todo: fontSize需要传参定义，不要写死 */}
      {/* Readme 简单补充一下图标库信息 */}
      <CreateIcon type={props.name} style={{ fontSize: '30px' }} />
    </Space>
  );
}
