import React from 'react';

import { ListItem } from '@/components/ListItem';
import { Styled_CompletedList } from '../Styles';

import { useAppSelector } from '@/app/hooks';

/** 近期模块 —— completed列表
 *
 * todo: 临时处理这里的列表，数据格式修改后再回头整理
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
      {completedList.map((item, index) => {
        return <ListItem key={item.id} {...item} editable={false} index={index} />;
      })}
    </Styled_CompletedList>
  );
}

export default CompletedList;
