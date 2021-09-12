import React from 'react';

import './Header.css';

import { SEARCH } from '../../lib/machines/searchMachine';

export default function Header({ send, data = {} }) {
  return (
    <>
      <input
        className="search-bar"
        type="text"
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            send({
              type: SEARCH,
              data: {
                tickerSymbol: ev.target.value,
              },
            });
          }
        }}
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
