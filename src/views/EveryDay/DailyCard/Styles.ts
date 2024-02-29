import styled from 'styled-components';

// index
export const Styled_EveryDayContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

// EachModule
export const Styled_EachModuleContainer = styled.div<{ bgColor: string }>`
  background: ${(props) => props.bgColor};
  width: 50%;
  height: 50%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

export const Styled_Title = styled.div`
  padding: 10px;
  user-select: none;
`;

export const Styled_ListBox = styled.div`
  flex: 1;
  padding: 0 15px 80px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
