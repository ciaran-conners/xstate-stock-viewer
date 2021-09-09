import axios from 'axios';
import { getFromTo } from './utils';

const API_KEY = 'c4t7pviad3icjlroqil0';
const NEWS_RANGE_DAYS = 7;

const client = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: API_KEY,
  },
});

export const getCompanyQuote = async ({ tickerSymbol }) => {
  // https://finnhub.io/docs/api/quote
  const params = {
    symbol: tickerSymbol,
  };

  const res = await client.get(`/quote`, {
    params,
  });

  return res.data;
};

export const getCompanyProfile = async ({ tickerSymbol }) => {
  // https://finnhub.io/docs/api/company-profile2
  const params = {
    symbol: tickerSymbol,
  };

  const res = await client.get(`/stock/profile2`, {
    params,
  });

  return res.data;
};

export const getCompanyPeers = async ({ tickerSymbol }) => {
  // https://finnhub.io/docs/api/company-peers
  const params = {
    symbol: tickerSymbol,
  };

  const res = await client.get(`/stock/peers`, {
    params,
  });

  return res.data;
};

export const getCompanyNews = async ({ tickerSymbol }) => {
  // https://finnhub.io/docs/api/company-news
  const { from, to } = getFromTo(NEWS_RANGE_DAYS);

  const params = {
    from,
    to,
    symbol: tickerSymbol,
  };

  const res = await client.get(`/company-news`, {
    params,
  });

  return res.data;
};
