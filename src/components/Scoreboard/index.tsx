import React, { FC } from 'react';
import {
  Scores, Title, Counter,
} from './style';

type PropTypes = {
  scores: number,
  title: string
}

const Scoreboard: FC<PropTypes> = ({ scores, title }: PropTypes) => (
  <Scores>
    <Title>{title}</Title>
    <Counter>{scores}</Counter>
  </Scores>
);

export default Scoreboard;
