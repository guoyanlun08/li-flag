import React from 'react';

export default function Leaf(props: any) {
  const style = {
    fontWeight: props.leaf.bold ? 'bold' : 'normal',
    fontStyle: props.leaf.italic ? 'italic' : 'normal',
    whiteSpace: 'pre',
    overflowWrap: 'normal'
    // XXX: 末尾是连续空格，不加下面属性，显示空格占位，只有输入个非空格字符才行。
    // paddingRight: '100px'
  };

  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
}
