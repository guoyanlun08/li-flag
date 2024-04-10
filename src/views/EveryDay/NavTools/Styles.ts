import styled, { css } from 'styled-components';

const navActive = css<{}>`
  color: rgb(255, 224, 110);
`;

export const Styled_NavTools = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Styled_NavToolItem = styled.div<{ active: boolean }>`
  height: 30px;
  line-height: 30px;
  padding: 0px 20px;
  margin-right: 20px;
  border-radius: 10px;
  background: #6b5cba;
  color: #d0d8d9;
  cursor: pointer;
  ${(props) => (props.active ? navActive : '')}
`;
