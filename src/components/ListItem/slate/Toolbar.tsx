import React, { CSSProperties } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

// toolbar 偏移量
const offsetX = 20;

interface propsType {
  left: number;
}

export function Toolbar(props: propsType) {
  const styleToolbar: CSSProperties = {
    position: 'absolute',
    display: 'flex',
    zIndex: 100,
    top: '-20px'
  };

  const editor = useSlate();

  const CustomEditor = {
    isStyleMarkActive(editor: any, style: string) {
      const marks: any = Editor.marks(editor);
      return marks ? marks[style] === true : false;
    },

    toggleBoldMark(event: any, editor: any) {
      event.preventDefault();
      const isActive = CustomEditor.isStyleMarkActive(editor, 'bold');
      if (isActive) {
        Editor.removeMark(editor, 'bold');
      } else {
        Editor.addMark(editor, 'bold', true);
      }
    },

    toggleItalicMark(event: any, editor: any) {
      event.preventDefault();
      const isActive = CustomEditor.isStyleMarkActive(editor, 'italic');
      if (isActive) {
        Editor.removeMark(editor, 'italic');
      } else {
        Editor.addMark(editor, 'italic', true);
      }
    }
  };

  return (
    <div style={{ ...styleToolbar, left: props.left - offsetX }}>
      <button onMouseDown={(event) => CustomEditor.toggleBoldMark(event, editor)}>B</button>
      <button onMouseDown={(event) => CustomEditor.toggleItalicMark(event, editor)}>I</button>
    </div>
  );
}
