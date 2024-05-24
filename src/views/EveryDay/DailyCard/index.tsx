import React, { useEffect } from 'react';
import dayjs from 'dayjs';

import useItemOperation from '@/components/ListItem/useItemOperation';

import { ModuleFields } from '@/features/todo/todoSlice';
import { apiGetTodoList } from '@/apis/todoItem';

import { Styled_CardModuleBox, Styled_EachCardContainer, Styled_Title, Styled_CoordinateSystem } from './Styles';
import EachModuleContent from '../EachModuleContent';
import { DailyPropsType } from '../EveryDay';

function DailyCard(props: DailyPropsType) {
  // 模块顺序
  const MODULE_ORDER = [
    ModuleFields.IMPORTANT_NOT_URGENT,
    ModuleFields.IMPORTANT_URGENT,
    ModuleFields.NOT_IMPORTANT_NOT_URGENT,
    ModuleFields.NOT_IMPORTANT_URGENT
  ];

  const { addNewTodoItem } = useItemOperation();
  useEffect(() => {
    // 获取 todoList 昨日未完成的数据
    async function getYesterdayDelayTodoList() {
      const data = {
        completed: 0,
        startTime: dayjs().subtract(1, 'day').startOf('day').valueOf(),
        endTime: dayjs().subtract(1, 'day').endOf('day').valueOf()
      };
      const { delayList } = await apiGetTodoList(data);
      console.log('delayList== 后台还未写', delayList);
    }

    getYesterdayDelayTodoList();
  }, []);

  return (
    <Styled_CardModuleBox>
      {/* 每张卡片模块 */}
      {MODULE_ORDER.map((module: string, index: number) => {
        const item = props.eachModule[module];
        const { color, moduleId, listData, title } = item;

        return (
          <Styled_EachCardContainer key={module} index={index} onDoubleClick={() => addNewTodoItem(moduleId)}>
            <Styled_Title color={color}>
              <div className="title-icon">{moduleId}</div>
              <div>{title}</div>
            </Styled_Title>
            <EachModuleContent moduleId={moduleId} listData={listData} delayListData={[]} />
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
