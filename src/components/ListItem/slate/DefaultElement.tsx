import React from 'react';

export function DefaultElement(props: any) {
  return (
    <p style={{ width: '100%' }} {...props.attributes}>
      {props.children}
    </p>
  );
}
