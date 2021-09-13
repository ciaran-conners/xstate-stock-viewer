import React from 'react';

import './Header.css';

export default function Header({ data = {}, handleOnChange, handleKeyDown, query }) {
  return (
    <div className="header-container">
      <input
        className="search-bar"
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        value={query}
      />
      {<QuoteDisplay {...data} />}
    </div>
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
