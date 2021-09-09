import React from 'react';
import './App.css';

import {
  getCompanyQuote,
  getCompanyProfile,
  getCompanyPeers,
  getCompanyNews
} from './lib/api';

const params = {
  tickerSymbol: 'aapl'
};

getCompanyQuote(params);
getCompanyProfile(params);
getCompanyPeers(params);
getCompanyNews(params);

function App() {
  return (
    <div className = "App" >
      do the api
    </div>
  );
}

export default App;