import React, { FC, useEffect, useState } from 'react';
import {
  Scores, Container, Addition, Title, Counter,
} from './style';

type PropTypes = {
  gainedScores: number
}

const Scoreboard: FC<PropTypes> = ({ gainedScores }: PropTypes) => {
  const [scores, setScores] = useState<number>(0);
  const [animationStarted, setAnimationStarted] = useState<boolean>(false);

  useEffect(() => {
    setAnimationStarted(false);
    setScores((prevScores) => prevScores + gainedScores);

    let timemout = null;
    if (timemout) clearTimeout(timemout);

    timemout = setTimeout(() => {
      setAnimationStarted(true);
    }, 10);
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
      <Scores>
        <Title>Score</Title>
        <Counter>{scores}</Counter>
      </Scores>
    </Container>
  );
};

export default Scoreboard;
