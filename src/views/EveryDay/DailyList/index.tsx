import React from 'react';
import { Collapse } from 'antd';

import { EachList } from './EachList';

const { Panel } = Collapse;

function DailyList(props: any) {
  return (
    <>
      {props.eachModuleOrder.map((module: string) => {
        const item = props.eachModule[module];
        return (
          <Collapse defaultActiveKey={[item.moduleId]}>
            <Panel header={item.moduleId} key={item.moduleId}>
              <EachList key={item.moduleId} {...item} />
            </Panel>
          </Collapse>
        );
      })}
    </>
  );
}

export default DailyList;
