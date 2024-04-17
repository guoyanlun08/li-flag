import styled from 'styled-components';

export const Styled_ListCollapse = styled.div<{ color: string }>`
  .list-label {
    font-size: 18px;
    color: ${(props) => props.color};
    display: flex;
    .list-label-icon {
      margin-right: 6px;
    }
    .list-label-title {
      font-weight: bold;
    }
  }
`;

export const Styled_DailyListContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 35px;
  display: flex;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  flex-direction: column;
`;

export const Styled_ListBox = styled.div`
  flex: 1;
  padding: 10px 15px;
`;
