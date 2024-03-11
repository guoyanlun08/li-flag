import React from 'react';

import { Styled_EveryDayContainer } from './Styles';
import { EachCard } from './EachCard';

function DailyCard(props: any) {
  const onContextMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;

    if (target.tagName === 'P') {
      props.showItemContextMenu({ event: e });
    }
  };

  return (
    <Styled_EveryDayContainer onContextMenu={onContextMenu}>
      {props.eachModuleOrder.map((module: string) => {
        const item = props.eachModule[module];
        return <EachCard key={item.moduleId} {...item} />;
      })}
    </Styled_EveryDayContainer>
  );
}

export default DailyCard;
