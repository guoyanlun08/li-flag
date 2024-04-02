import styled from 'styled-components';

// toolbar 偏移量
const offsetY = 25;

export const Styled_ToolBar = styled.div<{ left: number; top: number }>`
  position: fixed;
  display: flex;
  font-size: 12px;
  z-index: 100;
  top: ${(props) => `${props.top - offsetY}px`};
  left: ${(props) => `${props.left}px`};
  color: #fff;
  background-color: #000;
  padding: 3px 5px;
  column-gap: 3px;
  border-radius: 5px;
  & button {
    border: none;
    background-color: #000;
  }
  & button:hover {
    background-color: #2b2b2b;
    border-radius: 2px;
  }
`;
export const Styled_textNode = styled.p`
  width: 100%;
  padding-right: 15px;
  overflow-y: hidden;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
