import React, { useState, memo } from 'react';
import { Table, Select, Tag } from 'antd';
import type { TableProps } from 'antd';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { ListItem } from '@/components/ListItem';
import { apiUpdateTodoItem } from '@/apis/todoItem';
import { TodoListItemType } from '@/types/todoType';
import Row, { DragHandle } from './TableRow';
import { TeamTodoTableProps } from '../../types';
import { PRIORITY_DEFAULT_OPTIONS, PROCESSING_STATUS_OPTIONS } from '../constants';

/** 团队 todoList table */
const TeamTodoTable = memo((props: TeamTodoTableProps) => {
  const { isLock, todoList, dragChangeTeamTodoList, refreshTeamTodoList = () => {}, onLockTeamFlag, teamUserList } = props;

  /** todoItem 字段更新 - 优先级、处理人、处理状态 */
  const updateTodoItemField = async <T extends unknown>(field: string, value: T, record: TodoListItemType) => {
    const updateResp = await apiUpdateTodoItem({
      id: record.id,
      [field]: value
    });
    if (updateResp) {
      Promise.all([refreshTeamTodoList(), onLockTeamFlag()]);
    }
  };

  const columns: TableProps<TodoListItemType>['columns'] = [
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle isLock={isLock} /> },
    {
      title: 'Todo列表',
      dataIndex: 'todoValue',
      width: '50%',
      render: (value, todoItem, index) => {
        return (
          <div>
            <ListItem
              todoItem={todoItem}
              editable={!isLock}
              index={index}
              showMenuOutlined={false}
              showCheckbox={false}
              afterTextChangeHook={() => {
                onLockTeamFlag();
              }}
            />
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
          value={value}
          disabled={isLock}
          labelRender={(option) => {
            const { color } = PRIORITY_DEFAULT_OPTIONS.find((item) => item.value === option.value) || {};
            return <Tag color={color}>{option.label}</Tag>;
          }}
          onChange={(value) => updateTodoItemField<string>('priority', value, record)}
          options={PRIORITY_DEFAULT_OPTIONS}
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
            // showSearch
            allowClear
            placeholder="请选择"
            style={{ width: 100 }}
            value={value}
            disabled={isLock}
            onChange={(value) => updateTodoItemField<string>('processor', value, record)}
            options={teamUserList.map((userId) => ({
              label: userId,
              value: userId
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
            value={value}
            disabled={isLock}
            labelRender={(option) => {
              const { color } = PROCESSING_STATUS_OPTIONS.find((item) => item.value === option.value) || {};
              return <Tag color={color}>{option.label}</Tag>;
            }}
            onChange={(value) => updateTodoItemField<number>('processingStatus', value, record)}
            options={PROCESSING_STATUS_OPTIONS}
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

      Promise.all([dragChangeTeamTodoList(arrayMove(todoList, activeIndex, overIndex), todoList), onLockTeamFlag()]);
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={todoList.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <Table<TodoListItemType>
          rowKey="id"
          components={{ body: { row: Row } }}
          columns={columns}
          dataSource={todoList}
          pagination={false}
        />
      </SortableContext>
    </DndContext>
  );
});

export default TeamTodoTable;
