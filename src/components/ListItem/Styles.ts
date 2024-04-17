import styled from 'styled-components';
import { Editable } from 'slate-react';

import { MODULE_CONFIG_MAP, ModuleFields } from '@/features/todo/todoSlice';

const ITEM_HEIGHT = '35px';

export const Styled_Item = styled.div<{ selected: boolean; moduleId: ModuleFields }>`
  // 如果后面有主题色的需求，这里的 71,114,250 应是主题色
  background: ${(props) => (props.selected ? 'rgba(71,114,250, 0.1)' : '')};
  position: relative;
  display: flex;
  align-items: center;
  height: ${ITEM_HEIGHT};
  padding-left: 20px;
  &:hover {
    background: ${(props) => (props.selected ? 'rgba(71,114,250, 0.1)' : 'rgba(25, 25, 25, 0.08)')};
  }
  .drag-handle {
    position: absolute;
    left: 2px;
    top: 50%;
    transform: translate(0px, -50%);
    color: #000;
    font-size: 12px;
  }

  // checkbox
  .ant-checkbox-wrapper {
    .ant-checkbox-inner {
      border: 1px solid ${(props) => MODULE_CONFIG_MAP[props.moduleId].color};
    }
    &:hover {
      .ant-checkbox-inner {
        border: 1px solid ${(props) => MODULE_CONFIG_MAP[props.moduleId].color};
        background: ${(props) => MODULE_CONFIG_MAP[props.moduleId].color};
        opacity: 0.3;
      }
    }
  }
  // checkbox 选中
  .ant-checkbox-wrapper.ant-checkbox-wrapper-checked {
    .ant-checkbox-inner {
      border-color: #909399;
      background-color: #909399;
    }
    &:hover {
      .ant-checkbox-checked .ant-checkbox-inner {
        border-color: #304352;
        background-color: #304352;
        opacity: 1;
      }
    }
  }
  // 待【近期完成】验证 再删除下面注释代码
  /* .ant-checkbox {
    top: 0;
  }
  .ant-checkbox-disabled {
    background: rgb(204, 204, 204);
    .ant-checkbox-inner {
      border-color: rgb(204, 204, 204);
    }
    .ant-checkbox-inner:after {
      border-color: rgba(255, 255, 255, 0.6);
    }
  } */
`;
export const Styled_ItemContent = styled.div<{ selected: boolean; completed: number }>`
  border-bottom: ${(props) => (props.selected ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.2)')};
  padding-left: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${(props) => (props.completed ? '#909399' : 'rgba(0, 0, 0)')};
`;

export const Styled_EditNode = styled(Editable)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  p {
    height: 90%;
    line-height: ${ITEM_HEIGHT};
  }
`;
