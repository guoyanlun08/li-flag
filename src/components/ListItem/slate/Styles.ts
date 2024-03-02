import styled from 'styled-components';

// toolbar 偏移量
const offsetY = 25;

export const Styled_ToolBar = styled.div<{ left: number; top: number }>`
  position: fixed;
  display: flex;
  z-index: 100;
  top: ${(props) => `${props.top - offsetY}px`};
  left: ${(props) => `${props.left}px`};
  color: #fff;
  background-color: #000;
  padding: 3px 5px;
  column-gap: 3px;
  & button {
    border: none;
    background-color: #000;
  }
  & button:hover {
    background-color: #2b2b2b;
    border-radius: 2px;
  }
  .tool-italic {
    font-style: italic;
    font-family: serif;
  }
`;
