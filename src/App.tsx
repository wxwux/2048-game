import React, { FC, useState } from 'react';
import { GameCell } from './types';
import { createStartCells } from './core/init';

import Layout from './components/Layout';
import Field from './components/Field';

const initCells : GameCell[] = createStartCells();

function one ()  {
  console.log('go');
};

const App: FC = () => {
  const [cells, setCells] = useState<GameCell[]>([]);

  const onoo = one();

  const [str, setSts] = useState();


  return (
    <Layout>
      <Field cells={cells} />
    </Layout>
  );
};

export default App;
