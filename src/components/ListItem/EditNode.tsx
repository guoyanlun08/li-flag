import React, { useState, useCallback, useRef } from 'react';

import { Editor, createEditor } from 'slate'; // 导入 Slate 编辑器工厂。
import { Slate, Editable, withReact } from 'slate-react'; // 导入 Slate 组件和 React 插件。

import { Toolbar } from './slate/Toolbar';
import { DefaultElement } from './slate/DefaultElement';
import { Leaf } from './slate/Leaf';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }]
  }
];

export function EditNode(props: any) {
  const styleEditable = {
    height: '20px',
    width: '100%',
    border: 'none',
    outline: 'none'
  };

  const editableContainer = useRef<HTMLDivElement | null>(null);
  const [editor] = useState(() => withReact(createEditor()));
  const [toolbarLeft, setToolbarLeft] = useState(0);
  const [visiable, setVisable] = useState(false); // todo: visiable 确认写进 toolbar? 还是父组件上?

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
    console.log(props.selected);

    if (selection.toString().length > 0 && editableContainer.current && props.selected) {
      const range = selection.getRangeAt(0);
      const rangeRect = range.getBoundingClientRect();
      const editableRect = editableContainer.current.getBoundingClientRect();
      setVisable(true);
      setToolbarLeft(rangeRect.left - editableRect.left);
    } else {
      setVisable(false);
    }
  };

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div ref={editableContainer} style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}>
        {/* todo: toolbar 组件抽离成单独文件 */}
        {visiable && <Toolbar left={toolbarLeft} />}
        <Editable
          style={styleEditable}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onSelect={handleSelect}
          onBlur={() => setVisable(false)}
          onKeyDown={(event) => {
            // 不给换行
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
        />
      </div>
    </Slate>
  );
}
