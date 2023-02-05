import React from 'react';

import { ListItem } from '@/components/ListItem';

import { listItemType } from '@/types/todoType';

interface propsType {
  listData: listItemType[];
  moduleId: string;
}

function ListItemBox(props: propsType) {
  const { listData, moduleId } = props;

  return (
    <div>
      {listData.map((item, index) => (
        <ListItem key={item.id} {...item} moduleId={moduleId} index={index} />
      ))}
    </div>
  );
}

export default ListItemBox;
