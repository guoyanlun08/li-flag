import styled from 'styled-components';

export const Item = styled.div<{ selected: boolean; isHover: boolean }>`
  background: ${(props) => (props.selected ? 'rgba(255, 255, 255, 0.3)' : props.isHover ? 'rgba(255, 255, 255, 0.2)' : '')};
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
export const ItemContent = styled.div<{ selected: boolean; completed: boolean; isHover: boolean }>`
  border-bottom: ${(props) => (props.selected || props.isHover ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.2)')};
  padding-left: 8px;
  width: 100%;
  height: 100%;
  input {
    text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
    color: ${(props) => (props.completed ? 'rgba(255, 255, 255, 0.4)' : '#000')};
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
  }
`;
