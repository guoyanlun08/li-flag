import styled, { css, keyframes } from 'styled-components';

// 右向左的显示动画
const rightToLeftFrames = keyframes`
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

// 主标题的动画 —————— XXX: 这个报错提示先不用管，不确定有没有办法可以处理掉(下同)
const mainTitleAnimation = (props: any) =>
  css<{}>`
    ${rightToLeftFrames} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530);
  `;

// 左向右的显示动画
const leftToRightFrames = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

// 次标题的动画
const secondaryTitleAnimation = (props: any) =>
  css<{}>`
    ${leftToRightFrames} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530);
  `;

// 作为主标题样式
const MAIN_TITLE = css<{}>`
  width: 240px;
  height: 80px;
  border-radius: 20px 40px;
  font-size: 40px;
  margin-right: 20px;
  animation: ${mainTitleAnimation};
`;

// 作为次标题样式
const SECONDARY_TITLE = css<{}>`
  width: 120px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  animation: ${secondaryTitleAnimation};
  &:hover {
    opacity: 0.6;
  }
`;

/** index */
export const Styled_Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

/** ThemeBox */
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
  background: rgb(76, 60, 99);
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
  background: rgb(76, 60, 99);
  color: rgb(244, 243, 241);
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => (props.isToday ? MAIN_TITLE : SECONDARY_TITLE)}
`;

const fadeOutTransition = css<{}>`
  opacity: 0;
  transform: translateY(-200px);
  position: absolute;
`;
/** ConditionBox */
export const Styled_Condition = styled.div<{ isToday: boolean }>`
  background: rgb(239, 229, 220);
  border-radius: 20px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  height: 80px;
  margin-bottom: 20px;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.5s ease; /* 过渡效果 */
  ${(props) => (props.isToday ? fadeOutTransition : '')}
`;

/** ListBox */
export const Styled_CompletedList = styled.div`
  background: rgb(218, 189, 173);
  flex: 1;
  border-radius: 10px;
`;
