import styled from 'styled-components';
import mainColor from '@/styles/variables.module.scss';

export const Styled_TeamFlagDetail = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${mainColor.primaryBgColor2};
  .page-content {
    width: 100%;
    flex: 1;
    .page-content-body {
      background-color: ${mainColor.primaryBgColor};
      margin: 10px 10px;
      border-radius: 5px;
      height: calc(100% - 20px);
      .filter-form,
      .flag-item-table {
        padding: 10px 20px;
      }
    }
  }
`;

export const Styled_TeamFlagOperation = styled.div`
  font-size: 20px;
  font-weight: 600;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 20px;
  background-color: ${mainColor.primaryBgColor};
  display: flex;
  .backIcon {
    cursor: pointer;
    width: 30px;
    height: 100%;
    color: ${mainColor.primaryTextColor};
    display: flex;
    align-items: center;
    position: relative;
    &::after {
      content: '';
      width: 1px;
      height: 30px;
      background-color: #ccc;
      position: absolute;
      right: -5px;
      margin: 0 10px;
    }
  }
  .operate {
    width: 300px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 15px;
  }
  .title {
    height: 100%;
    color: ${mainColor.primaryTextColor};
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
