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

/** eachModule 的内容区 主容器 */
export const Styled_EachModuleContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

/** eachModule 的内容区 - 显示 todo列表 */
export const Styled_ListBox = styled.div`
  flex: 1;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

/** eachModule 内容区中的 过期区*/
export const Styled_DelayListBox = styled.div`
  height: 150px;
  background: #ccc;
`;
