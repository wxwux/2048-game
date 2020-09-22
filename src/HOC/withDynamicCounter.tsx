import React, {
  useEffect, useState, FC, ReactElement,
} from 'react';
import styled from 'styled-components';

interface ScoresProps {
  animated: boolean;
}

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

export const Container = styled.div`
  display: flex;
  font-weight: 500;
  align-items: center;
  font-size: 16px;
`;

type WrappedPropTypes = {
  score: number,
  title: string
}

type HOCPropTypes = {
  gainedScores: number,
  title: string,
  score: number
}

export const withDynamicCounter = (WrappedComponent: FC<WrappedPropTypes>) => function (
  { gainedScores, title, score }: HOCPropTypes,
): ReactElement {
  const [animationStarted, setAnimationStarted] = useState<boolean>(false);

  useEffect(() => {
    setAnimationStarted(false);

    let timemout = 0;
    if (timemout > 0) clearTimeout(timemout);

    timemout = setTimeout(() => {
      setAnimationStarted(true);
    }, 10);

    return () => {
      clearTimeout(timemout);
    };
  }, [gainedScores]);

  return (
    <Container>
      {
        gainedScores > 0 && (
          <Addition animated={animationStarted}>
            {`+ ${gainedScores}`}
          </Addition>
        )
      }
      <WrappedComponent score={score} title={title} />
    </Container>
  );
};
