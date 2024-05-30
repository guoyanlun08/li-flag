import React from 'react';
import { Collapse, CollapseProps } from 'antd';

import TodoList from '../TodoList';
import { DailyPropsType } from '../EveryDay';
import { ModuleDataType } from '@/types/todoType';
import { ModuleFields } from '@/features/todo/todoSlice';
import { Styled_ListCollapse, Styled_DailyListContainer } from './Styles';

// 模块顺序
const MODULE_ORDER = [
  ModuleFields.IMPORTANT_URGENT,
  ModuleFields.IMPORTANT_NOT_URGENT,
  ModuleFields.NOT_IMPORTANT_URGENT,
  ModuleFields.NOT_IMPORTANT_NOT_URGENT
];

/** 返回 Collapse里的 items */
const getItemsMap = (item: ModuleDataType) => {
  let ItemsMap: { [key in ModuleFields]: CollapseProps['items'] } = {
    [ModuleFields.IMPORTANT_URGENT]: undefined,
    [ModuleFields.IMPORTANT_NOT_URGENT]: undefined,
    [ModuleFields.NOT_IMPORTANT_URGENT]: undefined,
    [ModuleFields.NOT_IMPORTANT_NOT_URGENT]: undefined
  };

  // 根据 列表模式顺序 给 module赋值
  MODULE_ORDER.forEach((moduleId) => {
    ItemsMap[moduleId] = [
      {
        key: moduleId,
        label: (
          <div className="list-label">
            <div className="list-label-icon">{item.moduleId}</div>
            <div className="list-label-title">{item.title}</div>
          </div>
        ),
        children: (
          <Styled_DailyListContainer>
            <TodoList listData={item.listData} moduleId={moduleId} />
          </Styled_DailyListContainer>
        )
      }
    ];
  });

  return ItemsMap[item.moduleId];
};

/** 列表模式 */
function DailyList(props: DailyPropsType) {
  return (
    <>
      {MODULE_ORDER.map((module: string) => {
        const item = props.eachModule[module];
        return (
          <Styled_ListCollapse key={item.moduleId} color={item.color}>
            <Collapse items={getItemsMap(item)} defaultActiveKey={[item.moduleId]} />
          </Styled_ListCollapse>
        );
      })}
    </>
  );
}

export default DailyList;
