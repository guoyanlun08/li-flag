import React from 'react';

export function Leaf(props: any) {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        fontStyle: props.leaf.italic ? 'italic' : 'normal',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle'
      }}>
      {props.children}
    </span>
  );
}
