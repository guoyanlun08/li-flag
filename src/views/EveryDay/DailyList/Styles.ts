import styled from 'styled-components';

export const Styled_DailyListContainer = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;
  min-height: 35px;
  background-color: ${(props) => props.color};
  display: flex;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  flex-direction: column;
`;

export const Styled_ListBox = styled.div`
  flex: 1;
  padding: 10px 15px;
`;
