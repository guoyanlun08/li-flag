import styled from 'styled-components';

// index
export const EveryDayContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

// EachModule
export const EachModuleContainer = styled.div<{ bgColor: string }>`
  width: 50%;
  height: 50%;
  background: ${props => props.bgColor};
`;
