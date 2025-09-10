import { DragDropContext } from 'react-beautiful-dnd';
import { Button, Form, Select, Table } from 'antd';
import type { TableProps } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import TodoList from '@/views/EveryDay/TodoList';
import { TodoListItemType } from '@/types/todoType';
import { ModuleFields } from '@/features/todo/constants';
import { Styled_TeamFlagDetail } from '../Styles';

interface tableData {
  todoList: TodoListItemType[];
  priority: string;
  proposer: string;
  processor: string;
  processingStatus: number;
}

const columns: TableProps<tableData>['columns'] = [
  {
    title: 'Todo列表',
    dataIndex: 'todoList',
    key: 'todoList',
    width: '50%',
    render: (_, { todoList }) => <TodoList listData={todoList} moduleId={ModuleFields.TEAM_FLAG_MODULE} />
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    key: 'priority'
  },
  {
    title: '提出人',
    dataIndex: 'proposer',
    key: 'proposer'
  },
  {
    title: '处理人',
    dataIndex: 'processor',
    key: 'processor'
  },
  {
    title: 'status',
    key: 'processingStatus',
    render: () => <span style={{ color: 'red' }}>未处理</span>
  }
];
const tableData: any = [
  {
    key: '1',
    todoList: [
      {
        id: 1,
        moduleId: 'TEAM',
        todoValue: '[{"type":"paragraph","children":[{"text":"V1.60.80.03：mrf的安全控制的过载控制—网元的人说不急"}]}]',
        completed: 0,
        order: 1,
        createTime: 1757088000000,
        updateTime: 1757088000000,
        startTime: 1757088000000,
        endTime: 1757174399999
      }
    ],
    priority: 'p1',
    proposer: 'USER 1',
    processor: 'USER 2',
    processingStatus: 1
  }
];

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

function TeamFlagDeatail() {
  return (
    <>
      <Styled_TeamFlagDetail>
        <div className="page-title">
          <div className="backIcon" onClick={() => window.history.back()}>
            <RollbackOutlined />
          </div>
          <div className="title">Team Flag</div>
          <div className="operate">
            <Button type="primary">锁定</Button>
            <Button type="primary">编辑</Button>
          </div>
        </div>
        <div className="page-content">
          <div className="page-content-body">
            <div className="filter-form">
              <TeamFlagFilter />
            </div>
            <div className="flag-item-table">
              <DragDropContext onDragEnd={() => {}}>
                <Table columns={columns} dataSource={tableData} />
              </DragDropContext>
            </div>
          </div>
        </div>
      </Styled_TeamFlagDetail>
    </>
  );
}

export default TeamFlagDeatail;
