import styled from 'styled-components';

// 作为主标题样式
const MAIN_TITLE = `
  width: 240px;
  height: 80px;
  border-radius: 20px 40px;
  font-size: 40px;
  margin-right: 20px;
`;

// 作为次标题样式
const SECONDARY_TITLE = `
  width: 120px;
  height: 40px;
  border-radius: 20px;
  align-self: end;
`;

// index
export const Styled_Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// ThemeBox
export const Styled_Theme = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  margin-bottom: 20px;
`;

export const Styled_ThemeBox = styled.div`
  display: flex;
  align-items: center;
`;

export const Styled_ThemeTitle = styled.div<{ isToday: boolean }>`
  background: rgb(255, 228, 78);
  color: rgb(251, 248, 236);
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => (props.isToday ? SECONDARY_TITLE : MAIN_TITLE)}
`;

export const Styled_ThemeIcon = styled.div`
  margin-right: 20px;
`;

export const Styled_ThemeToday = styled.div<{ isToday: boolean }>`
  background: rgb(183, 221, 208);
  color: rgb(244, 243, 241);
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => (props.isToday ? MAIN_TITLE : SECONDARY_TITLE)}
  &:hover {
    background: rgb(50, 169, 159);
  }
`;

// ConditionBox
export const Styled_Condition = styled.div`
  background: rgba(200, 200, 255, 0.8);
  border-radius: 20px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  height: 80px;
  margin-bottom: 20px;
`;

// ListBox
export const Styled_CompletedList = styled.div`
  background: rgba(100, 200, 200, 0.8);
  flex: 1;
`;
