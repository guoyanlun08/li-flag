import React from 'react';
import { TooltipContainer } from './Styles';

interface PropsType {
  showTooltip: boolean;
  left: number;
  top: number;
  getTooltipBounding: (width: number, height: number) => void;
}

function Tooltip(props: PropsType) {
  const { showTooltip, left, top } = props;
  return (
    <TooltipContainer
      ref={(ele) => {
        if (ele) {
          props.getTooltipBounding(ele.offsetWidth, ele.offsetHeight);
        }
      }}
      style={{ visibility: showTooltip ? 'visible' : 'hidden', left: left, top: top }}>
      <div>B</div>
      <div>I</div>
      <div>{'</>'}</div>
      <div>链接</div>
    </TooltipContainer>
  );
}

export default Tooltip;
