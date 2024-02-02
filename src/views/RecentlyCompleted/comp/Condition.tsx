import React from 'react';
import { Select } from 'antd';

import { Styled_Condition } from '../Styles';

/** 近期模块 —— 筛选条件 */
function Condition() {
  const countDayChange = () => {};

  return (
    <Styled_Condition>
      <Select style={{ width: 200 }} onChange={countDayChange}>
        <Select.Option value="sample">3</Select.Option>
        <Select.Option value="sample1">5</Select.Option>
        <Select.Option value="sample2">7</Select.Option>
      </Select>
      <div>分页</div>
      <div>包括今天的数据</div>
    </Styled_Condition>
  );
}

export default Condition;
