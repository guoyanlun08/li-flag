import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createEditor } from 'slate'; // 导入 Slate 编辑器工厂。
import { ReactEditor, Slate, withReact } from 'slate-react'; // 导入 Slate 组件和 React 插件。

import { useDebounce } from '@/hooks/efficientHooks';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import useItemOperation from './useItemOperation';
import { setItemTodoValue, updateTodoItemThunk } from '@/features/todo/todoSlice';

import { Styled_EditNode } from './Styles';
import { Toolbar, DefaultElement, Leaf } from './slate';

interface PropsType {
  todoValue: string;
  selected: boolean;
}

export function EditNode(props: PropsType) {
  const { todoValue, selected } = props;

  const todoState = useAppSelector((store) => store.todo);
  const dispatch = useAppDispatch();
  const { addNewTodoItem } = useItemOperation();
  const inputDebounce = useDebounce();
  const selectDebounce = useDebounce();

  const editableContainer = useRef<HTMLDivElement | null>(null);
  const [editor] = useState(() => withReact(createEditor()));
  const [toolbarOptions, setToolbarOptions] = useState({
    visible: false,
    left: 0,
    top: 0
  });

  useEffect(() => {
    if (selected) {
      ReactEditor.focus(editor);
    }
  }, [selected]);

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      // todo: 链接
      // case 'link':
      //   return <LinkElement  {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const handleSelect = (e: any) => {
    const selection: any = document.getSelection();
    if (selection.toString().length > 0 && editableContainer.current && selected) {
      const range = selection.getRangeAt(0);
      const rangeRect = range.getBoundingClientRect();
      const offsetX = rangeRect.width / 2;

      setToolbarOptions((preState) => ({ ...preState, visible: true, top: rangeRect.top }));
      // 向左拖拽选中
      if (selection.anchorOffset > selection.focusOffset) {
        setToolbarOptions((preState) => ({ ...preState, left: rangeRect.left }));
      } else {
        setToolbarOptions((preState) => ({ ...preState, left: rangeRect.left + offsetX }));
      }
    } else {
      setToolbarOptions((preState) => ({ ...preState, visible: false }));
    }
  };

  // 实际 触发 slate text的保存文本变化
  const realTextChange = async (todoValue: string) => {
    if (todoState.selectedItem) {
      const { id, moduleId } = todoState.selectedItem;
      const { payload: resp } = await dispatch(updateTodoItemThunk({ id, todoValue }));
      if (resp) {
        dispatch(setItemTodoValue({ id, moduleId, todoValue }));
      }
    }
  };

  const resetSelect = () => {
    window?.getSelection()?.removeAllRanges();
    setToolbarOptions((preState) => ({ ...preState, visible: false }));
  };

  return (
    <div style={{ width: '100%', height: '100%', paddingRight: '15px' }}>
      <Slate
        editor={editor}
        initialValue={JSON.parse(todoValue)}
        onChange={(value) => {
          // 结构改变
          const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type);
          // 文本值改变
          const isTextChange = editor.operations.some((op) => op.type === 'insert_text' || op.type === 'remove_text');

          if (isTextChange) {
            inputDebounce(realTextChange, 1000, JSON.stringify(value));
          }
        }}>
        <div
          ref={editableContainer}
          style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', paddingRight: '10px' }}>
          <Toolbar visible={toolbarOptions.visible} left={toolbarOptions.left} top={toolbarOptions.top} />
          <Styled_EditNode
            spellCheck={false}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onSelect={() => selectDebounce(handleSelect, 100)}
            onBlur={resetSelect}
            onKeyDown={async (event) => {
              // 不给换行
              if (event.key === 'Enter') {
                event.preventDefault();
                if (todoState.selectedItem) {
                  const { moduleId, order } = todoState.selectedItem;
                  // await addNewTodoItem(moduleId, 'insert', order);
                }
              }
            }}
          />
        </div>
      </Slate>
    </div>
  );
}
