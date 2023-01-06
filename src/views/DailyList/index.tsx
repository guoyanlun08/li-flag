import React, { useState } from 'react';
import variables from '@/styles/variables.module.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Collapse } from 'antd';

import { EachList } from './EachList';

const {Panel} = Collapse

// todo: 后续这些类型应该需要抽出来，等后台确定先
interface eachModuleType {
  [property: string]: moduleData
}
interface moduleData {
  title: string,
  bgColor: string,
  listData: listItem[]
}
export interface listItem {
  id: number,
  text: string,
  completed: boolean
}

// 测试数据 -- 后续删除
const initData: eachModuleType = {
  'droppable-list-A': {
    title: 'A',
    bgColor: variables.mainRed,
    listData: [
      {
        id: 1,
        text: 'A-111',
        completed: false
      },
      {
        id: 2,
        text: 'A-222',
        completed: true
      },
      {
        id: 3,
        text: 'A-333',
        completed: false
      }
    ]
  },
  'droppable-list-B': {
    title: 'B',
    bgColor: variables.mainBlue,
    listData: [
      {
        id: 4,
        text: 'B-111',
        completed: false
      },
      {
        id: 5,
        text: 'B-222',
        completed: true
      },
      {
        id: 6,
        text: 'B-333',
        completed: false
      }
    ]
  },
  'droppable-list-C': {
    title: 'C',
    bgColor: variables.mainGreen,
    listData: [
      {
        id: 7,
        text: 'C-111',
        completed: false
      },
      {
        id: 8,
        text: 'C-222',
        completed: true
      },
      {
        id: 9,
        text: 'C-333',
        completed: false
      }
    ]
  },
  'droppable-list-D': {
    title: 'D',
    bgColor: variables.mainGray,
    listData: [
      {
        id: 10,
        text: 'D-111',
        completed: false
      },
      {
        id: 11,
        text: 'D-222',
        completed: true
      },
      {
        id: 12,
        text: 'D-333',
        completed: false
      }
    ]
  }
};

// droppable-list 对应 initData 的下标 todo: 后面改为枚举
const initModuleArr = ['droppable-list-A', 'droppable-list-B', 'droppable-list-C', 'droppable-list-D']

function reorderList(list: listItem[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export function DailyList() {
  const [dragStatus, setDragStatus] = useState(false)
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [eachModuleData, setEachModuleData] = useState(initData); // 每个模块的数据
  const [moduleArr] = useState(initModuleArr) // 遍历每个模块

  const onBeforeDragStart = () => {
    setDragStatus(true)
  }
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    setDragStatus(false)
    if (!destination) {
      return
    }

    // 是同一 Droppable内的拖拽
    if (source.droppableId === destination.droppableId) {
      const beforeDragModule = eachModuleData[source.droppableId]
      const afterDragModule = reorderList(beforeDragModule.listData, source.index, destination.index)

      setEachModuleData(pre => {
        const newState = { ...pre }
        newState[source.droppableId].listData = afterDragModule

        return newState
      })
      return
    }

    // 两个不同的模块之间的拖拽
    const sourceModule = eachModuleData[source.droppableId]
    const dragItem = sourceModule.listData[source.index]

    setEachModuleData(pre => {
      const newState = { ...pre }
      newState[source.droppableId].listData.splice(source.index, 1)
      newState[destination.droppableId].listData.splice(destination.index, 0, dragItem)

      return newState
    })

  }

  return (
    <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragEnd={onDragEnd}>
      <Collapse>
        {moduleArr.map((module) => {
          const item = eachModuleData[module]
          return (
            <Panel header={item.title} key={item.title}>
                <EachList key={item.title} {...item} dragStatus={dragStatus}
                    selectedId={selectedId} setSelectedId={setSelectedId} />
            </Panel>
            
          );
        })}
      </Collapse>
    </DragDropContext>
  );
}
