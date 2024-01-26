import React from 'react';

export function DefaultElement(props: any) {
  return <p {...props.attributes}>{props.children}</p>;
}
