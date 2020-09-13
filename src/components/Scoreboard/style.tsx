import styled from 'styled-components';

interface ScoresProps {
  animated: boolean;
}

export const Container = styled.div`
  display: flex;
  font-weight: 500;
  align-items: center;
  font-size: 16px;
`;

export const Addition = styled.div<ScoresProps>`
  color: #95ac95;
  margin-right: 12px;
  font-size: 20px;
  font-weight: bold;
  
  ${({ animated }) => animated && `
    animation: fadeUp .4s; 
    animation-delay: .3s;
    animation-fill-mode: forwards;
  `} 
  
  @keyframes fadeUp {
    from { transform: translateY(0); opacity: 1 }
    to { transform: translateY(-50px); opacity: 0 }
  }
`;

export const Scores = styled.div`
  padding: 10px 25px;
  background-color: #eee;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: #bbada0;
  align-items: center;
`;

export const Counter = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #fff;
`;

export const Title = styled.div`
  color: #eee4da;
  font-size: 13px;
  text-transform: uppercase;
`
