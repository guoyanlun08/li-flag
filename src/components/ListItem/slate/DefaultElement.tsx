import React from 'react';
import { Styled_textNode } from './Styles';
export function DefaultElement(props: any) {
  return <Styled_textNode {...props.attributes}>{props.children}</Styled_textNode>;
}
