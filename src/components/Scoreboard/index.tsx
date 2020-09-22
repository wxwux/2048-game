import React, { FC } from 'react';
import {
  Score, Title, Counter,
} from './style';

type PropTypes = {
  score: number,
  title: string
}

const Scoreboard: FC<PropTypes> = ({ score, title }: PropTypes) => (
  <Score>
    <Title>{title}</Title>
    <Counter>{score}</Counter>
  </Score>
);

export default Scoreboard;
