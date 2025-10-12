import { Form, Select, Tag } from 'antd';

import { PRIORITY_DEFAULT_OPTIONS, TodoListFilterParams } from '../constants';

type PropsType = {
  /** 团队用户列表 */
  teamUserList: string[];
  /** 筛选 todoList 过滤参数 */
  onFilterParamsChange: <T>(filed: string, value: T) => void;
};

/** 团队 flag 筛选 */
function TeamFlagFilter(props: PropsType) {
  const { teamUserList, onFilterParamsChange } = props;
  return (
    <Form layout="inline">
      <Form.Item label="处理人">
        <Select
          allowClear
          style={{ width: 120 }}
          options={teamUserList.map((userId) => ({
            label: userId,
            value: userId
          }))}
          onChange={(value) => {
            onFilterParamsChange<string>(TodoListFilterParams.Processor, value);
          }}
        />
      </Form.Item>
      <Form.Item label="优先级">
        <Select
          allowClear
          style={{ width: 120 }}
          labelRender={(option) => {
            const { color } = PRIORITY_DEFAULT_OPTIONS.find((item) => item.value === option.value) || {};
            return <Tag color={color}>{option.label}</Tag>;
          }}
          options={PRIORITY_DEFAULT_OPTIONS}
          optionRender={(option) => (
            <div>
              <Tag color={option.data.color}>{option.label}</Tag>
            </div>
          )}
          onChange={(value) => {
            onFilterParamsChange<string>(TodoListFilterParams.Priority, value);
          }}
        />
      </Form.Item>
    </Form>
  );
}

export default TeamFlagFilter;
