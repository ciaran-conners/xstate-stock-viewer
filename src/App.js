import React from 'react';
import { useMachine } from '@xstate/react';

import './App.css';

import {
  createSearchMachine,
  nextSearch,
  pending,
  noResults,
} from './lib/machines/searchMachine';

import Header from './components/Header/Header';
import CompanyProfile from './components/CompanyProfile/CompanyProfile';
import NewsFeed from './components/NewsFeed/NewsFeed';

function App() {
  const [current, send] = useMachine(createSearchMachine({}));

  if (current.matches(pending)) {
    return <div>loading...</div>;
  }

  const { quoteData, profileData, newsData } =
    current.context.currentSearchResults;

  return (
    <div>
      <Header send={send} data={quoteData} />
      {current.matches(nextSearch) && (
        <div className="App">
          <CompanyProfile data={profileData} />
          <NewsFeed data={newsData} />
        </div>
      )}
      {current.matches(noResults) && (
        <div className="App">
          <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
            ticker not found
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
