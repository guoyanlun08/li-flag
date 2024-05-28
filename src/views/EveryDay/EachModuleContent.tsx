import React from 'react';
import { Collapse, Button } from 'antd';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import useItemOperation from '@/components/ListItem/useItemOperation';

import { ListItem } from '@/components/ListItem';
import { Styled_EachModuleContent, Styled_ListBox, Styled_DelayListBox } from './Styles';
import { ModuleFields } from '@/features/todo/constants';
import { TodoListItemType } from '@/types/todoType';

type PropsType = {
  moduleId: ModuleFields;
  listData: TodoListItemType[];
  delayListData?: TodoListItemType[];
};

const EachModuleContent = (props: PropsType) => {
  const { moduleId, listData, delayListData } = props;

  const { addNewTodoItem } = useItemOperation();

  // Collapse 的子项
  const delayItems = [
    {
      key: '1',
      label: '已过期',
      children:
        delayListData?.length &&
        delayListData.map((delayItem, index) => <ListItem key={delayItem.id} todoItem={delayItem} editable={false} index={index} />),
      extra: (
        <Button size="small" type="link">
          顺延
        </Button>
      )
    }
  ];

  // 双击新增 todoItem
  const handleDoubleClick = (e: React.MouseEvent, moduleId: string) => {
    e.stopPropagation();
    addNewTodoItem(moduleId);
  };

  return (
    <Styled_EachModuleContent>
      {/* 时间段内的 todoList */}
      <Droppable droppableId={moduleId} type="listType">
        {(provided, snapshot) => (
          <Styled_ListBox ref={provided.innerRef} {...provided.droppableProps} onDoubleClick={(e) => handleDoubleClick(e, moduleId)}>
            {listData.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided: any) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <ListItem todoItem={item} editable={true} dragHandle={provided.dragHandleProps} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Styled_ListBox>
        )}
      </Droppable>

      {/* 昨日未完成的 todoList */}
      <Styled_DelayListBox>
        <Collapse defaultActiveKey={['1']} items={delayItems} />
      </Styled_DelayListBox>
    </Styled_EachModuleContent>
  );
};
export default EachModuleContent;
