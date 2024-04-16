import styled from 'styled-components';

// index
export const Styled_EveryDayContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

// EachModule
export const Styled_EachModuleContainer = styled.div<{ color?: string }>`
  background: ${(props) => props.color};
  width: 50%;
  height: 50%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

export const Styled_Title = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  padding: 10px 10px 0px;
  user-select: none;
  height: 40px;
  line-height: 25px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  .title-icon {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    border-radius: 50%;
    margin-right: 6px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: normal;
    display: flex;
    justify-content: center;
    background: ${(props) => props.color};
    color: #fff;
  }
`;

export const Styled_ListBox = styled.div`
  flex: 1;
  padding: 0 15px 80px 0;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
