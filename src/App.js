import { useMachine } from '@xstate/react';
import React from 'react';
import './App.css';

import { createSearchMachine } from './lib/machines/searchMachine';

function App() {
  const [current, send] = useMachine(createSearchMachine({ context: {} }));
  if (Object.keys(current.context.currentSearchResults).length === 0) {
    return <div>loading...</div>;
  }

  return <div className="App">{JSON.stringify(current.context.currentSearchResults)}</div>;
}

export default App;
