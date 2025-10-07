import styled from 'styled-components';
import mainColor from '@/styles/variables.module.scss';

export const Styled_TeamFlagOutlet = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${mainColor.primaryBgColor2};
  .nav-header {
    height: 50px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
    background-color: ${mainColor.primaryBgColor};
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 1px;
      width: 95%;
      left: 2.5%;
      background-color: ${mainColor.primaryTextColor};
    }
  }
  .team-Flag-content {
    /* height: calc(100% - 50px); */
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Styled_CardHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${mainColor.primaryTextColor};
  .team-flag-icon {
    width: 50px;
  }
  .header-title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    .title,
    .description {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .title {
    }
    .description {
      font-size: 12px;
    }
  }
  .flag-status {
    width: 200px;
    display: flex;
    align-items: center;
    .dead-line {
      font-size: 12px;
      width: 170px;
      padding: 0 10px;
    }
    .card-operation {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export const Styled_CardFooterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 50px;
  .flag-record {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    column-gap: 20px;
    .finish-record,
    .total-record {
      span:first-child {
        margin-right: 5px;
      }
    }
  }
  .team-menber {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
`;
