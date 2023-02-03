import React from 'react';

import { ListItem } from '@/components/ListItem';

import { listItemType } from '@/types/todoType';

interface propsType {
  listData: listItemType[];
  moduleId: string;
  dragStatus: boolean;
  selectedId: number;
  setSelectedId: (v: number) => void;
}

function ListItemBox(props: propsType) {
  const { listData, moduleId, dragStatus, selectedId, setSelectedId } = props;
  return (
    <div>
      {listData.map((item, index) => (
        <ListItem
          key={item.id}
          {...item}
          moduleId={moduleId}
          index={index}
          dragStatus={dragStatus}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ))}
    </div>
  );
}

export default ListItemBox;
