import React, { useState, useContext, useEffect } from 'react';
import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Menu, Item, useContextMenu, ItemParams } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { toggleItemCompletedStatus, setSelectedId, getTodoListThunk } from '@/features/todo/todoSlice';
import api from '@/utils/httpRequest';
import { EveryDayContext } from '@/views/EveryDay';

import { Styled_Item, Styled_ItemContent } from './Styles';
import { EditNode } from './EditNode';
interface PropsType {
  moduleId: string;
  id: number;
  index: number;
  value: {}[];
  completed: number;
  editable: boolean;
  dragHandle?: any;
}

export function ListItem(props: PropsType) {
  const context = useContext(EveryDayContext);
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((store) => store.todo);
  const MENU_ID = 'rightMenu';
  const { show } = useContextMenu({
    id: MENU_ID
  });

  const { moduleId, id, editable, value, index, completed, dragHandle } = props;
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!context.dragStatus) {
      setIsHover(false);
    }
  }, [context.dragStatus]);

  const isSelected = todoState.selectedId === id;

  const selectItemFn = () => {
    dispatch(setSelectedId({ id }));
  };

  const mouseEnterItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(true);
  };
  const mouseLeaveItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(false);
  };
  const displayMenu = (e: React.MouseEvent) => {
    show({
      event: e
    });
  };
  const deleteItemClick = async ({ event, props, triggerEvent, data }: ItemParams) => {
    console.log(data);
    // 每个模块都加数据，点击删除看打印的数据都是同一个模块，哪里传的参数可能不对
    // const res = await api.post('/todoItem/deleteTodoItemById', { id });
    // console.log(res);
    // if (res && res.code === 0) {
    //   dispatch(getTodoListThunk());
    // }
  };

  return (
    <>
      <Styled_Item
        selected={isSelected}
        onMouseDown={selectItemFn}
        onMouseEnter={mouseEnterItemFn}
        onMouseLeave={mouseLeaveItemFn}
        onDoubleClick={(e) => e.stopPropagation()}
        onContextMenu={displayMenu}>
        <MenuOutlined style={{ display: editable && isHover ? 'block' : 'none' }} className="drag-handle" {...dragHandle} />
        <Checkbox
          checked={Boolean(completed)}
          disabled={!editable}
          onChange={() => dispatch(toggleItemCompletedStatus({ moduleId: moduleId, itemIndex: index }))}
        />
        <Styled_ItemContent selected={isSelected}>
          {/* todo: 展示 value的 text需要处理 */}
          {editable ? <EditNode selected={isSelected} /> : <div></div>}
        </Styled_ItemContent>
      </Styled_Item>
      <Menu id={MENU_ID} animation="fade">
        <Item onClick={deleteItemClick} data={{ moduleId, id }}>
          删除
        </Item>
      </Menu>
    </>
  );
}
