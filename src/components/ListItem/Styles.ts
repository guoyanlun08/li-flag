import styled from 'styled-components';
import { Editable } from 'slate-react'; // 导入 Slate 组件和 React 插件。

export const Styled_Item = styled.div<{ selected: boolean }>`
  background: ${(props) => (props.selected ? 'rgba(255, 255, 255, 0.3)' : '')};
  position: relative;
  display: flex;
  align-items: center;
  height: 35px;
  padding-left: 20px;
  .drag-handle {
    position: absolute;
    left: 2px;
    top: 50%;
    transform: translate(0px, -50%);
    color: #000;
    font-size: 12px;
  }
  .ant-checkbox {
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
  }
`;
export const Styled_ItemContent = styled.div<{ selected: boolean; completed: number }>`
  border-bottom: ${(props) => (props.selected ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.2)')};
  padding-left: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${(props) => (props.completed ? 'rgb(255, 255, 255, 0.6)' : 'rgba(0, 0, 0)')};
`;

export const Styled_EditNode = styled(Editable)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  p {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 1px;
  }
`;
