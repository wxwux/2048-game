import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 20px 0;
  width: 100%;
  align-items: center;
`;

export const Controlls = styled.div``;

export const Board = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  
  & > * {
    margin-right: 12px;
    
    &:last-child {
      margin-right: 0px;
    }
  }
`;
