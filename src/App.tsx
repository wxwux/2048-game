import React, { FC, useState, useEffect } from 'react';
import { GameCell, Direction } from './types';
import { createInitialCells, populateFieldWithNewCells } from './core/creator';
import { checkAvailableMoves, isEmptyCellsExist, moveCellsToDirection } from './core/engine';
import { removeAndIncreaseCells } from './core/updater';
import { scoresService } from './services/scores';

import Layout from './components/Layout';
import Field from './components/Field';
import ControlPanel from './components/ControlPanel';
import Button from './components/Button';
import Scoreboard from './components/Scoreboard';
import { matrixAreSame } from './core/matrix';

import { withDynamicCounter } from './HOC/withDynamicCounter';

const initCells : GameCell[] = createInitialCells();

const ScoresWithDynamicCounter = withDynamicCounter(Scoreboard);

const bestScore = scoresService.get();

const mappedKeysToDirections: {
  [key: string]: Direction
} = {
  ArrowUp: Direction.UP,
  ArrowRight: Direction.RIGHT,
  ArrowDown: Direction.DOWN,
  ArrowLeft: Direction.LEFT,
};

const App: FC = () => {
  const [cells, setCells] = useState<GameCell[]>(initCells);
  const [totalScores, setTotalScores] = useState<number>(0);
  const [gainedScores, setGainedScores] = useState<number>(0);

  const runNewGame = (): void => {
    setCells(createInitialCells());
    setTotalScores(0);
  };

  const updateFieldByDirection = (direction: Direction) => {
    const movedCells = moveCellsToDirection(cells, direction);
    const [cleanedAndIncreasedCells, gainedScoresAfterMove] = removeAndIncreaseCells(movedCells);
    let resultCells: GameCell[] = cleanedAndIncreasedCells;
    const totalScoreAfterMove = totalScores + gainedScoresAfterMove;

    if (!matrixAreSame(cells, cleanedAndIncreasedCells)) {
      resultCells = populateFieldWithNewCells(cleanedAndIncreasedCells);

      const fieldHasAvailableCells = isEmptyCellsExist(resultCells);

      if (!fieldHasAvailableCells) {
        // TODO: check if any moves available
      }
    }

    checkAvailableMoves(resultCells);

    setCells(resultCells);
    setGainedScores(gainedScoresAfterMove);
    setTotalScores(totalScoreAfterMove);

    if (totalScoreAfterMove > bestScore) {
      scoresService.save(totalScoreAfterMove);
    }
  };

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (Object.keys(mappedKeysToDirections).includes(event.code)) {
      updateFieldByDirection(mappedKeysToDirections[event.code]);
    }
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
        <ScoresWithDynamicCounter gainedScores={gainedScores} scores={totalScores} title="score" />
        <Scoreboard scores={bestScore} title="Best" />
      </ControlPanel>
      <Field cells={cells} />
    </Layout>
  );
};

export default App;
