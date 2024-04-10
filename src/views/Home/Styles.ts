import styled from 'styled-components';

export const Styled_Home = styled.div`
  .footer {
    display: flex;
    justify-content: center;
    font-size: 20px;
    .footer-btn {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const Styled_Header = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  h1 {
    font-size: 30px;
  }
`;

export const Styled_Introduce = styled.div`
  margin-bottom: 20px;
  .intro-title {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .intro-content {
    font-size: 20px;
    .feature-box {
      p {
        margin-bottom: 6px;
      }
    }
  }
`;
