import styled from 'styled-components';

export const Styled_EveryDayOutlet = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav-tools {
    height: 50px;
  }
  .everyday-outlet {
    flex: 1;
  }
`;

/** eachModule 的内容区 - 显示 todo列表 */
export const Styled_ListBox = styled.div`
  flex: 1;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
