import styled from 'styled-components';

/** DailyCard/index 主容器 */
export const Styled_CardModuleBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  background: rgba(71, 114, 250, 0.1);
`;

/** 坐标系 */
export const Styled_CoordinateSystem = styled.div`
  .axis {
    position: absolute;
    background-color: rgb(178, 178, 178);
    .axis-arrow {
      position: absolute;
      width: 10px;
      height: 10px;
    }
    .axis-name {
      position: absolute;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .x-axis {
    width: 96%;
    height: 2px;
    top: 50%;
    left: 2%;
    transform: translateY(-50%);
    .x-arrow {
      right: -4px;
      top: -5px;
      border-top: 4px solid rgb(178, 178, 178);
      border-right: 4px solid rgb(178, 178, 178);
      transform: rotate(45deg);
    }
    .x-name {
      right: -2%;
      top: -25px;
      color: #ffb000;
    }
  }
  .y-axis {
    width: 2px;
    height: 96%;
    top: 2%;
    left: 50%;
    transform: translateX(-50%);
    .y-arrow {
      right: -4px;
      top: -2px;
      border-top: 4px solid rgb(178, 178, 178);
      border-right: 4px solid rgb(178, 178, 178);
      transform: rotate(-45deg);
    }
    .y-name {
      width: 40px;
      right: -6px;
      top: -2%;
      color: #ff4d4f;
    }
  }
`;

/** DailyCard/EachCard 主容器 */
export const Styled_EachCardContainer = styled.div<{ index: number }>`
  background: #fff;
  margin-right: ${(props) => (props.index === 0 || props.index === 2 ? '2%' : '0px')};
  width: 49%;
  height: 49%;
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

/** eachModule 的内容区 主容器 */
export const Styled_EachModuleContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

/** eachModule 内容区中的 过期区*/
export const Styled_DelayListBox = styled.div`
  padding: 0px 2px;
  .ant-collapse {
    margin-bottom: 6px;
    // 折叠头部
    .ant-collapse-header {
      padding: 4px 12px;
      .ant-collapse-extra .ant-btn-sm {
        font-size: 12px;
      }
    }
    // 折叠内容区
    .ant-collapse-content {
      border-top: 0px;
    }
  }
`;
