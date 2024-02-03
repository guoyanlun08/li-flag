import React from 'react';
import { Space, Form, Select, Switch, Checkbox } from 'antd';

import { Styled_Condition } from '../Styles';

/** 近期模块 —— 筛选条件 */
function Condition() {
  const countDayChange = () => {};

  return (
    <Styled_Condition>
      <Form layout="inline">
        <Space size={50}>
          <Form.Item label="近期时间段" name="disabled" valuePropName="checked">
            <Select style={{ width: 200 }} onChange={countDayChange}>
              <Select.Option value="sample">3</Select.Option>
              <Select.Option value="sample1">5</Select.Option>
              <Select.Option value="sample2">7</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="是否开启分页" name="disabled" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item label="是否包括今日数据" name="disabled" valuePropName="checked">
            <Checkbox value="A" style={{ lineHeight: '32px' }} />
          </Form.Item>
        </Space>
      </Form>
    </Styled_Condition>
  );
}

export default Condition;
