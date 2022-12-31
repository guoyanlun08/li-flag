import React, { useMemo, useState } from 'react';

import { Checkbox } from 'antd';
import { Item, ItemContent } from './Styles';

interface PropsType {
  id: number;
  text: string;
  completed: boolean;
  selectedId: number;
  setSelectedId: (v: number) => void;
}

export function ListItem(props: PropsType) {
  const [completed, setCompleted] = useState(props.completed); // item状态
  const [textValue, setTextValue] = useState(props.text);

  // 是否选中当前 Item
  const isSelected = useMemo(() => props.selectedId === props.id, [props.selectedId, props.id]);

  const clickItemFn = () => {
    props.setSelectedId(props.id);
  };

  return (
    <Item selected={isSelected} onClick={clickItemFn}>
      <Checkbox checked={completed} onChange={() => setCompleted(!completed)} />
      <ItemContent selected={isSelected} completed={completed}>
        <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
      </ItemContent>
    </Item>
  );
}
