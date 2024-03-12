import React from 'react';
import { Space, Form, AutoComplete, Switch, Checkbox } from 'antd';

import { recentFormType } from '../index';
import { Styled_Condition } from '../Styles';

type propsType = {
  form: recentFormType;
  setForm: any;
};

/** 近期模块 —— 筛选条件 */
function Condition(props: propsType) {
  const { form } = props;
  const recentDayOptions = [
    { value: 3, label: '近3天' },
    { value: 5, label: '近5天' },
    { value: 7, label: '近7天' }
  ];
  const countDayChange = () => {};

  return (
    <Styled_Condition>
      <Form layout="inline">
        <Space size={50}>
          <Form.Item label="近期时间段" name="recentDays">
            <AutoComplete
              defaultValue={form.recentDays}
              options={recentDayOptions}
              style={{ width: 200 }}
              // onSelect={onSelect}
              // onSearch={(text) => setOptions(getPanelValue(text))}
              placeholder="可以输入天数"
            />
          </Form.Item>

          <Form.Item label="是否开启分页">
            <Switch checked={form.skipPage} />
          </Form.Item>

          <Form.Item label="是否包括今日数据">
            <Checkbox checked={form.includeToday} style={{ lineHeight: '32px' }} />
          </Form.Item>
        </Space>
      </Form>
    </Styled_Condition>
  );
}

export default Condition;
