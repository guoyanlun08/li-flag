import React from 'react';

export default function Leaf(props: any) {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal', fontStyle: props.leaf.italic ? 'italic' : 'normal', whiteSpace: 'nowrap' }}>
      {props.children}
    </span>
  );
}
