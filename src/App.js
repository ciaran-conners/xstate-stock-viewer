import React from 'react';
import { useMachine } from '@xstate/react';

import './App.css';

import {
  createSearchMachine,
  nextSearch,
  pending,
  noResults,
  SEARCH,
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

  const { currentQuery } = current.context;

  return (
    <>
      <Header
        handleKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            send({
              type: SEARCH,
              data: {
                query: ev.target.value,
              },
            });
          }
        }}
        data={quoteData}
        query={currentQuery}
      />
      <div className="App">
        {current.matches(nextSearch) && (
          <>
            <CompanyProfile data={profileData} />
            <NewsFeed data={newsData} />
          </>
        )}
        {current.matches(noResults) && (
          <div className="no-results">ticker not found</div>
        )}
      </div>
    </>
  );
}

export default App;
