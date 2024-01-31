import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';
const iconUrl = [
    '//at.alicdn.com/t/c/font_4429243_mr9nhpea77g.js',
]
const CreateIcon = createFromIconfontCN({
    scriptUrl: iconUrl,
});
interface IProps {
    name: string;
}

export default function IconFont(props: IProps) {
    return (
        <Space>
            <CreateIcon type={props.name} style={{fontSize: '30px'}}/>
        </Space>
    )
}