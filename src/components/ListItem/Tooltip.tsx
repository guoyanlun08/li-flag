import React, { MouseEvent } from 'react';

import { TooltipContainer } from './Styles';
import { useAppSelector, useAppDispatch } from '@/app/hooks';

interface PropsType {
  showTooltip: boolean;
  left: number;
  top: number;
}

const Tooltip = React.forwardRef<HTMLDivElement, PropsType>((props, ref) => {
  // const { eachModule } = useAppSelector((state) => state.todo);
  // const dispatch = useAppDispatch();

  const { showTooltip, left, top } = props;

  const turnBlod = (e: MouseEvent) => {
    e.preventDefault();
    const sel = document.getSelection();

    const range = sel?.getRangeAt(0);

    console.log('sel', sel);
    console.log('range', range);
  };
  return (
    <TooltipContainer ref={ref} style={{ visibility: showTooltip ? 'visible' : 'hidden', left: left, top: top }}>
      <div onMouseDown={turnBlod}>B</div>
      <div>I</div>
      <div>{'</>'}</div>
      <div>链接</div>
    </TooltipContainer>
  );
});

export default Tooltip;
