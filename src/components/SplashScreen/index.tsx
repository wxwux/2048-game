import React, { FC } from 'react';
import { Container, Title } from './styles';
import Button from '../Button';

type PropTypes = {
  title: string,
  onRetry: () => void;
};

const SplashScreen: FC<PropTypes> = ({ title, onRetry }: PropTypes) => (
  <Container>
    <Title>{title}</Title>
    <Button onClick={onRetry}>Try Again</Button>
  </Container>
);

export default SplashScreen;
