import React, { useCallback, useState } from 'react';
import { useMachine } from '@xstate/react';
import _debounce from 'lodash.debounce';

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

  const { quoteData, profileData, newsData } =
    current.context.currentSearchResults;

  const { currentQuery } = current.context;

  // this piece of state is purely to maintain the query to be displayed in the UI
  // the input is controlled, because we need to set a value on it, and so we need to set an onChange
  // in addition to managing the value ourselves
  const [searchVal, setSearchVal] = useState(currentQuery);

  const sendDebounced = useCallback(_debounce((val) => {
    send({
      type: SEARCH,
      data: {
        query: val,
      },
    });
  }, 2500), []);

  if (current.matches(pending)) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Header
        handleKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            setSearchVal(ev.target.value);
            send({
              type: SEARCH,
              data: {
                query: ev.target.value,
              },
            });
          }
        }}
        handleOnChange={(ev) => {
          setSearchVal(ev.target.value);
          sendDebounced(ev.target.value);
        }}
        data={quoteData}
        // passed down only to be reflected in the UI
        query={searchVal}
      />
      <div className="main-content">
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
