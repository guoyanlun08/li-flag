import { Form, Select,  } from 'antd';

/** 团队 flag 筛选 */
function TeamFlagFilter() {
  return (
    <Form layout="inline">
      <Form.Item label="成员">
        <Select style={{ width: 120 }}>
          <Select.Option value="1">USER 1</Select.Option>
          <Select.Option value="2">USER 2</Select.Option>
          <Select.Option value="3">USER 3</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="优先级">
        <Select style={{ width: 120 }}>
          <Select.Option value="P0">P0</Select.Option>
          <Select.Option value="P1">P1</Select.Option>
          <Select.Option value="P2">P2</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
}

export default TeamFlagFilter;
