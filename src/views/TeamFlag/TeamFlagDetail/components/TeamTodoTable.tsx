import React, { useState } from 'react';
import { Table, Select, Tag } from 'antd';
import type { TableProps } from 'antd';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { ListItem } from '@/components/ListItem';
import { useUserList, useDebounce } from '@/hooks';
import { apiUpdateTodoItem } from '@/apis/todoItem';
import { TodoListItemType } from '@/types/todoType';
import Row, { DragHandle } from './TableRow';
import { TeamTodoTableProps } from '../../types';
import { prioritydefaultOptions, processingStatusOptions } from '../constants';

/** 团队 todoList table */
function TeamTodoTable(props: TeamTodoTableProps) {
  const { todoList, dragChangeTeamTodoList, refreshTeamTodoList = () => {} } = props;
  const [userSearchKey, setUserSearchKey] = useState('');

  const { userList } = useUserList(userSearchKey);
  const searchDebounce = useDebounce();

  /** 处理人选择器搜索 */
  const handleSearch = (value: string) => {
    setUserSearchKey(value);
  };

  /** todoItem 字段更新 - 优先级、处理人、处理状态 */
  const updateTodoItemField = async <T extends unknown>(field: string, value: T, record: TodoListItemType) => {
    const updateResp = await apiUpdateTodoItem({
      id: record.id,
      [field]: value
    });
    if (updateResp) {
      refreshTeamTodoList();
    }
  };

  const columns: TableProps<TodoListItemType>['columns'] = [
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    {
      title: 'Todo列表',
      dataIndex: 'todoValue',
      width: '50%',
      render: (value, todoItem, index) => {
        return (
          <div>
            <ListItem todoItem={todoItem} editable={true} index={index} showMenuOutlined={false} showCheckbox={false} />
          </div>
        );
      }
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      render: (value: string, record, index: number) => (
        <Select
          placeholder="请选择"
          style={{ width: 100 }}
          labelRender={(option) => {
            const { color } = prioritydefaultOptions.find((item) => item.value === option.value) || {};
            return <Tag color={color}>{option.label}</Tag>;
          }}
          value={value}
          onChange={(value) => updateTodoItemField<string>('priority', value, record)}
          options={prioritydefaultOptions}
          optionRender={(option) => (
            <div>
              <Tag color={option.data.color}>{option.label}</Tag>
            </div>
          )}
        />
      )
    },
    {
      title: '提出人',
      dataIndex: 'proposer'
    },
    {
      title: '处理人',
      dataIndex: 'processor',
      render: (value: string, record, index: number) => {
        return (
          <Select
            showSearch
            allowClear
            placeholder="请选择"
            style={{ width: 100 }}
            value={value}
            onSearch={(value) => searchDebounce(handleSearch, 500, value)}
            onChange={(value) => updateTodoItemField<string>('processor', value, record)}
            options={(userList || []).map((d) => ({
              value: d.userId,
              label: d.userId
            }))}
          />
        );
      }
    },
    {
      title: '处理状态',
      dataIndex: 'processingStatus',
      render: (value: number, record, index: number) => {
        return (
          <Select
            allowClear
            placeholder="请选择"
            style={{ width: 120 }}
            labelRender={(option) => {
              const { color } = processingStatusOptions.find((item) => item.value === option.value) || {};
              return <Tag color={color}>{option.label}</Tag>;
            }}
            value={value}
            onChange={(value) => updateTodoItemField<number>('processingStatus', value, record)}
            options={processingStatusOptions}
            optionRender={(option) => (
              <div>
                <Tag color={option.data.color}>{option.label}</Tag>
              </div>
            )}
          />
        );
      }
    }
  ];

  /** 拖动排序 */
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = todoList.findIndex((record) => record.id === active?.id);
      const overIndex = todoList.findIndex((record) => record.id === over?.id);

      dragChangeTeamTodoList(arrayMove(todoList, activeIndex, overIndex), todoList);
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={todoList.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <Table<TodoListItemType> rowKey="id" components={{ body: { row: Row } }} columns={columns} dataSource={todoList} />
      </SortableContext>
    </DndContext>
  );
}

export default TeamTodoTable;
