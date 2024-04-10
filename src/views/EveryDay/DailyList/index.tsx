import React from 'react';
import { Collapse } from 'antd';

import { EachList } from './EachList';

// https://ant-design.antgroup.com/components/collapse-cn  控制台有报提示，antd文档建议 5.6 换种写法
const { Panel } = Collapse;

function DailyList(props: any) {
  return (
    <>
      {props.eachModuleOrder.map((module: string) => {
        const item = props.eachModule[module];
        return (
          <Collapse key={item.moduleId} defaultActiveKey={[item.moduleId]}>
            <Panel header={item.moduleId} key={item.moduleId}>
              <EachList {...item} />
            </Panel>
          </Collapse>
        );
      })}
    </>
  );
}

export default DailyList;
