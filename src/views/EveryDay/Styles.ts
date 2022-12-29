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
  border-radius: 20px;
  background: ${props => props.bgColor};
`;

export const Title = styled.div`
  padding: 10px;
`

export const ListBox = styled.div`
  padding: 0 15px;
`
