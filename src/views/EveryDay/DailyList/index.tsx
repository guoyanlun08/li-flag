import React from 'react';
import { Collapse } from 'antd';

import { EachList } from './EachList';

const { Panel } = Collapse;

function DailyList(props: any) {
  return (
    <Collapse>
      {props.eachModuleOrder.map((module: string) => {
        const item = props.eachModule[module];
        return (
          <Panel header={item.title} key={item.title}>
            <EachList key={item.title} {...item} />
          </Panel>
        );
      })}
    </Collapse>
  );
}

export default DailyList;
