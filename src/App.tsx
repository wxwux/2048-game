import React, { FC, useState, useEffect } from 'react';
import { GameCell } from './types';
import { createStartCells } from './core/initer';

import Layout from './components/Layout';
import Field from './components/Field';
import ControlPanel from './components/ControlPanel';
import Button from './components/Button';
import Score from './components/Score';

const initCells : GameCell[] = createStartCells();

const App: FC = () => {
  const [cells, setCells] = useState<GameCell[]>(initCells);
  const [scores, setScores] = useState<number>(0);

  const runNewGame = (): void => {
    setCells(createStartCells());
    setScores(0);
  };

  const handleKeyPress = (event: KeyboardEvent): void => {
    console.log('asda');
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <Layout>
      <ControlPanel>
        <Button onClick={runNewGame}>New Game</Button>
        <Score>{scores}</Score>
      </ControlPanel>
      <Field cells={cells} />
    </Layout>
  );
};

export default App;
