import React, { useState } from 'react';

import './Header.css';

export default function Header({ data = {}, handleKeyDown, query }) {
  // maintain local state (controlled component) in order to reflect the value back into the UI
  // doesn't feel like the state machine is the right place for this purely UI piece of state
  const [searchVal, setSearchVal] = useState(query);
  return (
    <>
      <input
        className="search-bar"
        type="text"
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchVal(e.target.value)}
        value={searchVal || query}
      />
      {<QuoteDisplay {...data} />}
    </>
  );
}

function QuoteDisplay({ currentPrice, dayHighPrice, dayLowPrice }) {
  return (
    <>
      <span className="quote-datum">Price {currentPrice || '---'}</span>
      <span className="quote-datum">High {dayHighPrice || '---'}</span>
      <span className="quote-datum">Low {dayLowPrice || '---'}</span>
    </>
  );
}
