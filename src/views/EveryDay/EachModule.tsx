import React from 'react';
import { EachModuleContainer, Title, ListBox } from './Styles';
import { ListItem } from '@/components/ListItem';

interface propsType {
  bgColor: string;
  title: string;
  selectedId: number;
  setSelectedId: (v: number) => void;
}

// 测试数据 -- 后续删除
const temporaryData: any = {
  A: 0,
  B: 1000,
  C: 2000,
  D: 3000
};

export function EachModule(props: propsType) {
  // 测试数据 -- 后续删除
  const testData = [
    {
      id: 1 + temporaryData[props.title],
      text: '111',
      completed: false
    },
    {
      id: 2 + temporaryData[props.title],
      text: '222',
      completed: true
    },
    {
      id: 3 + temporaryData[props.title],
      text: '333',
      completed: false
    }
  ];

  return (
    <EachModuleContainer bgColor={props.bgColor}>
      <Title>{props.title}</Title>
      <ListBox>
        {testData.map((item) => {
          return (
            <ListItem
              key={item.id}
              id={item.id}
              text={item.text}
              completed={item.completed}
              selectedId={props.selectedId}
              setSelectedId={props.setSelectedId}
            />
          );
        })}
      </ListBox>
    </EachModuleContainer>
  );
}
