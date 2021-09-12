import React, { useState } from 'react';

import './Header.css';

export default function Header({ data = {}, handleOnChange, handleKeyDown, query }) {
  return (
    <>
      <input
        className="search-bar"
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        value={query}
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
