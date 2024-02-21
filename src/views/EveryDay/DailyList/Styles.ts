import styled from 'styled-components';

export const Styled_DailyListContainer = styled.div<{ bgColor: string }>`
  width: 100%;
  height: 100%;
  min-height: 35px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
`;

export const Styled_ListBox = styled.div`
  flex: 1;
  padding: 0 15px;
`;
