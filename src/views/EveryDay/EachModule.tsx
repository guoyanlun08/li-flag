import React from 'react';
import { EachModuleContainer, Title, ListBox } from './Styles';
import { ListItem } from '@/components/ListItem';

interface propsType {
  bgColor: string;
  title: string;
}

export function EachModule(props: propsType) {
  return (
    <EachModuleContainer bgColor={props.bgColor}>
      <Title>{props.title}</Title>
      <ListBox>
        <ListItem text="111" completed={true} />
        <ListItem text="222" completed={false} />
        <ListItem text="333" completed={false} />
      </ListBox>
    </EachModuleContainer>
  );
}
