import React from 'react';
import { Space, Form, AutoComplete, Switch, Radio, Button } from 'antd';

import { recentFormType } from '../index';
import { Styled_Condition } from '../Styles';

type propsType = {
  isToday: boolean;
  form: recentFormType;
  handleChange: (value: Partial<recentFormType>) => void;
  handleReset: () => void;
};

const RECENT_DAY_OPTIONS = [
  { value: '3', label: '近3天' },
  { value: '5', label: '近5天' },
  { value: '7', label: '近7天' }
];

/** 近期模块 —— 筛选条件 */
function Condition(props: propsType) {
  const { isToday, form, handleChange, handleReset } = props;

  return (
    <Styled_Condition isToday={isToday}>
      <Form layout="inline">
        <Space size={50}>
          <Form.Item initialValue={form.recentDays} label="近期时间段">
            <AutoComplete
              value={String(form.recentDays)}
              options={RECENT_DAY_OPTIONS}
              style={{ width: 200 }}
              onSelect={(value) => handleChange({ recentDays: Number(value) })}
              onSearch={(value) => handleChange({ recentDays: Number(value) })} // TODO: 需要约束只能输入数字
              placeholder="可以输入天数"
            />
          </Form.Item>

          <Form.Item label="模块">
            <Radio.Group
              onChange={({ target: { value } }) => handleChange({ moduleId: value })}
              defaultValue={undefined}
              value={form.moduleId}>
              <Radio value={undefined}>所有模块</Radio>
              <Radio value={'A'}>A</Radio>
              <Radio value={'B'}>B</Radio>
              <Radio value={'C'}>C</Radio>
              <Radio value={'D'}>D</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={() => handleReset()}>
              重 置
            </Button>
          </Form.Item>
          {/* <Form.Item label="是否开启分页">
            <Switch checked={form.isSkip} onChange={(value) => handleChange({ isSkip: value })} />
          </Form.Item> */}
        </Space>
      </Form>
    </Styled_Condition>
  );
}

export default Condition;
