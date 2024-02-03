import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { ListItem } from '@/components/ListItem';
import { Styled_CompletedList } from '../Styles';

import { useAppSelector } from '@/app/hooks';

/** 近期模块 —— completed列表
 *
 * todo: 临时处理这里的列表，数据格式修改后再回头整理
 * ListItem 可能需要调整，不够通用，待确定
 */
function CompletedList() {
  const completedList: any[] = [];
  const { eachModule } = useAppSelector((state) => state.todo);

  for (const key in eachModule) {
    const completedModuleList = eachModule[key].listData.filter((item) => {
      return item.completed;
    });
    completedList.push(...completedModuleList);
  }

  return (
    <Styled_CompletedList>
      <Droppable droppableId="droppable-list-A" type="listType">
        {(provided, snapshot) => (
          <div>
            {completedList.map((item, index) => {
              return <ListItem key={item.id} {...item} moduleId="droppable-list-A" index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Styled_CompletedList>
  );
}

export default CompletedList;
