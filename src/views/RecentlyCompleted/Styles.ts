import styled from 'styled-components';

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

export const Styled_ThemeTitle = styled.div`
  background: rgb(255, 228, 78);
  color: rgb(251, 248, 236);
  padding: 15px 30px;
  border-radius: 20px 40px;
  font-size: 40px;
  margin-right: 20px;
`;

export const Styled_ThemeIcon = styled.div`
  margin-right: 20px;
`;

export const Styled_ThemeToday = styled.div`
  background: rgb(183, 221, 208);
  color: rgb(244, 243, 241);
  align-self: end;
  border-radius: 20px;
  padding: 10px;
  &:hover{
    background: rgb(50, 169, 159);
  }
`;

// ConditionBox
export const Styled_Condition = styled.div`
  background: rgba(200, 200, 255, 0.8);
  display: flex;
  align-items: center;
  height: 80px;
  margin-bottom: 20px;
`;

// ListBox
export const Styled_List = styled.div`
  background: rgba(100, 200, 200, 0.8);
  flex: 1;
`;

