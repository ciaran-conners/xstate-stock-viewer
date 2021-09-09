import axios from 'axios';
import { getFromTo } from './utils';

const API_KEY = 'c4t7pviad3icjlroqil0';
const NEWS_RANGE_DAYS = 7;

const client = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: API_KEY
  }
});

export const getCompanyQuote = async ({ tickerSymbol }) => {
  // quote?symbol=AAPL&token=
  const params = {
    symbol: tickerSymbol
  };

  const res = await client.get(`/quote`, { params });

  console.log('quote: ', res.data);
};

export const getCompanyProfile = async ({ tickerSymbol }) => {
  const params = {
    symbol: tickerSymbol
  };

  const res = await client.get(`/stock/profile2`, { params });

  console.log('profile: ', res.data);
};

export const getCompanyPeers = async ({ tickerSymbol }) => {
  const params = {
    symbol: tickerSymbol
  };

  const res = await client.get(`/stock/peers`, { params });

  console.log('peers: ', res.data);
};

export const getCompanyNews = async ({ tickerSymbol }) => {
  const { from, to } = getFromTo(NEWS_RANGE_DAYS);

  const params = {
    from,
    to,
    symbol: tickerSymbol
  };

  const res = await client.get(`/company-news`, { params });

  console.log('news: ', res.data);
};
