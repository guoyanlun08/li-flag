import React from 'react';
import { Collapse, CollapseProps } from 'antd';

import { ModuleFields } from '@/features/todo/todoSlice';

import { ModuleDataType } from '@/types/todoType';
import { DailyPropsType } from '../EveryDay';
import { EachList } from './EachList';
import { Styled_ListCollapse } from './Styles';

function DailyList(props: DailyPropsType) {
  // 模块顺序
  const MODULE_ORDER = [
    ModuleFields.IMPORTANT_URGENT,
    ModuleFields.IMPORTANT_NOT_URGENT,
    ModuleFields.NOT_IMPORTANT_URGENT,
    ModuleFields.NOT_IMPORTANT_NOT_URGENT
  ];

  const getItemsMap = (item: ModuleDataType) => {
    let ItemsMap: { [key in ModuleFields]: CollapseProps['items'] } = {
      [ModuleFields.IMPORTANT_URGENT]: undefined,
      [ModuleFields.IMPORTANT_NOT_URGENT]: undefined,
      [ModuleFields.NOT_IMPORTANT_URGENT]: undefined,
      [ModuleFields.NOT_IMPORTANT_NOT_URGENT]: undefined
    };
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
          children: <EachList item={item} />
        }
      ];
    });

    return ItemsMap[item.moduleId];
  };

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
