import React, { useContext } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import useItemOperation from '@/hooks/useItemOperation';

import { TodoListItemType } from '@/types/todoType';
import { ModuleFields } from '@/features/todo/todoSlice';
import { EveryDayContext } from '@/views/EveryDay/EveryDay';
import { ListItem } from '@/components/ListItem';
import { Styled_ListBox } from './Styles';

interface PropsType {
  listData: TodoListItemType[];
  moduleId: ModuleFields;
}

function TodoList(props: PropsType) {
  const { listData, moduleId } = props;

  const context = useContext(EveryDayContext);

  const { addEveryDayTodoItem, getEveryDayTodoList } = useItemOperation();

  // 双击新增 todoItem
  const handleDoubleClick = async (e: React.MouseEvent, moduleId: string) => {
    e.stopPropagation();
    const newRes = await addEveryDayTodoItem(moduleId);
    if (newRes.hadAdd) {
      getEveryDayTodoList();
    }
  };

  return (
    <Droppable droppableId={moduleId} type="listType">
      {(provided) => (
        <Styled_ListBox ref={provided.innerRef} {...provided.droppableProps} onDoubleClick={(e) => handleDoubleClick(e, moduleId)}>
          {listData.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
              {(provided: any) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                  <ListItem
                    todoItem={item}
                    editable={true}
                    dragHandle={provided.dragHandleProps}
                    index={index}
                    dragStatus={context.dragStatus}
                    afterCheckBoxChange={() => {
                      getEveryDayTodoList();
                    }}
                    afterTextChangeHook={() => {
                      getEveryDayTodoList();
                    }}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Styled_ListBox>
      )}
    </Droppable>
  );
}

export default TodoList;
