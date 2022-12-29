import React, { useState } from 'react';

import { Checkbox } from 'antd';
import { Item, ItemContent } from './Styles';

interface PropsType {
  text: string;
  completed: boolean;
}

export function ListItem(props: PropsType) {
  const [selected, setSelected] = useState(false); // 选中行
  const [completed, setCompleted] = useState(props.completed); // item状态
  const [textValue, setTextValue] = useState(props.text);

  const focusFn = () => {
    setSelected(true);
  };

  const blurFn = () => {
    setSelected(false);
  };

  return (
    <Item selected={selected}>
      <Checkbox checked={completed} onChange={() => setCompleted(!completed)} />
      <ItemContent selected={selected} completed={completed}>
        <input type="text" onFocus={focusFn} onBlur={blurFn} value={textValue} onChange={(e) => setTextValue(e.target.value)} />
      </ItemContent>
    </Item>
  );
}
