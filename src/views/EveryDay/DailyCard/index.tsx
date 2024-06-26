import React, { useEffect } from 'react';

import useItemOperation from '@/hooks/useItemOperation';
import { useAppSelector } from '@/app/hooks';

import EachModuleContent from './EachModuleContent';
import { ModuleFields } from '@/features/todo/todoSlice';
import { DailyPropsType } from '../EveryDay';
import { Styled_CardModuleBox, Styled_EachCardContainer, Styled_Title, Styled_CoordinateSystem } from './Styles';

// 模块顺序
const MODULE_ORDER = [
  ModuleFields.IMPORTANT_NOT_URGENT,
  ModuleFields.IMPORTANT_URGENT,
  ModuleFields.NOT_IMPORTANT_NOT_URGENT,
  ModuleFields.NOT_IMPORTANT_URGENT
];

/** 卡片模式 */
function DailyCard(props: DailyPropsType) {
  const { delayListDataMap } = useAppSelector((store) => store.todo);
  const { getDelayTodoList } = useItemOperation();

  useEffect(() => {
    // 初始化delayListDataMap
    async function initDelayListDataMap() {
      await getDelayTodoList();
    }

    initDelayListDataMap();
  }, []);

  return (
    <Styled_CardModuleBox>
      {/* 每张卡片模块 */}
      {MODULE_ORDER.map((module: string, index: number) => {
        const item = props.eachModule[module];
        const { color, moduleId, listData, title } = item;

        return (
          <Styled_EachCardContainer key={module} index={index}>
            <Styled_Title color={color}>
              <div className="title-icon">{moduleId}</div>
              <div>{title}</div>
            </Styled_Title>
            <EachModuleContent moduleId={moduleId} listData={listData} delayListData={delayListDataMap[moduleId]} />
          </Styled_EachCardContainer>
        );
      })}

      {/* 坐标系 */}
      <Styled_CoordinateSystem>
        <div className="axis x-axis">
          <div className="axis-arrow x-arrow" />
          <div className="axis-name x-name">紧急</div>
        </div>
        <div className="axis y-axis">
          <div className="axis-arrow y-arrow" />
          <div className="axis-name y-name">重要</div>
        </div>
      </Styled_CoordinateSystem>
    </Styled_CardModuleBox>
  );
}

export default DailyCard;
