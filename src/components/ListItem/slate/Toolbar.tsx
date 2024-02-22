import React from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import { Styled_ToolBar} from './Styles';

// toolbar 偏移量
const offsetX = 20;

interface propsType {
  left: number;
}

export function Toolbar(props: propsType) {
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
    <Styled_ToolBar left={props.left - offsetX}>
      <button className='tool-bold' onMouseDown={(event) => CustomEditor.toggleBoldMark(event, editor)}>B</button>
      <button className='tool-italic' onMouseDown={(event) => CustomEditor.toggleItalicMark(event, editor)}>I</button>
    </Styled_ToolBar>
  );
}
