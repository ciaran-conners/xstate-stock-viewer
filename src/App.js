import React, { useCallback, useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import _debounce from 'lodash.debounce';

import './App.css';

import {
  createSearchMachine,
  nextSearch,
  pending,
  noResults,
  error,
  SEARCH,
} from './lib/machines/searchMachine';

import Header from './components/Header/Header';
import CompanyProfile from './components/CompanyProfile/CompanyProfile';
import NewsFeed from './components/NewsFeed/NewsFeed';

function App() {
  const [current, send] = useMachine(createSearchMachine({}));

  const { quoteData, profileData, peersData, newsData } =
    current.context.currentSearchResults;

  const { currentQuery } = current.context;

  // this piece of state is purely to maintain the query to be displayed in the UI
  // (which otherwise would vanish when the search bar unmount/remounts).
  // because we need to set a value on the input, it must be a controlled input
  // that requires setting an onChange in addition to managing the value ourselves
  const [searchVal, setSearchVal] = useState(currentQuery);

  // debounce searches triggered by the user typing
  const sendDebounced = useCallback(
    _debounce((val) => {
      if (val.length > 2) {
        send({
          type: SEARCH,
          data: {
            query: val,
          },
        });
      }
    }, 2000),
    []
  );

  // sync up search bar state with global state
  useEffect(() => {
    setSearchVal(currentQuery);
  }, [currentQuery]);

  if (current.matches(pending)) {
    return <div>loading...</div>;
  }

  if (current.matches(error)) {
    return <div>error - please try again later</div>;
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
        // passed down to be reflected in the UI
        query={searchVal}
      />
      <div className="main-content">
        {current.matches(nextSearch) && (
          <>
            <CompanyProfile
              peersData={peersData}
              profileData={profileData}
              handleClickPeer={(e) => {
                send({
                  type: SEARCH,
                  data: {
                    query: e.target.value,
                  },
                });
              }}
              currentQuery={currentQuery}
            />
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
