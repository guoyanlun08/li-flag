import styled from 'styled-components';

export const Item = styled.div<{ selected: boolean }>`
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
`;
export const ItemContent = styled.div<{ selected: boolean; completed: boolean }>`
  border-bottom: ${(props) => (props.selected ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.2)')};
  padding-left: 8px;
  width: 100%;
  height: 100%;
`;

export const EditNode = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  &:focus {
    border: none;
    outline: none;
  }
`;

// Tooltip
export const TooltipContainer = styled.div`
  position: fixed;
  display: flex;
  background: #242424;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  z-index: 10006;
`;
