import React from 'react';
import { EachModuleContainer } from './Styles';

interface propsType {
  bgColor: string;
}

export function EachModule(props: propsType) {
  return <EachModuleContainer bgColor={props.bgColor}></EachModuleContainer>;
}
