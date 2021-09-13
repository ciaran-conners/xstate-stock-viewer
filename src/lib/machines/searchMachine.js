import { createMachine, assign } from 'xstate';

import {
  getCompanyQuote,
  getCompanyProfile,
  getCompanyPeers,
  getCompanyNews,
} from '../api';

import { getUrlParam } from '../utils';

export const newSearch = '@states/newSearch';
export const pending = '@states/pending';
export const nextSearch = '@states/nextSearch';
export const noResults = '@states/noResults';
export const error = '@states/error';

export const SEARCH = '@events/search';

const actions = {
  setSearchResInCtx: assign({
    currentSearchResults: (ctx, ev) => ev.data,
  }),
  setCurrentQueryInCtx: assign({
    currentQuery: (ctx, ev) => ev.data.query,
  }),
};

const guards = {
  noTickerFound: (ctx, ev) => {
    return ev.data.quoteData.currentPrice === 0;
  },
};

const services = {
  doSearch: async (ctx, ev) => {
    const params = {
      tickerSymbol: ctx.currentQuery,
    };

    const [quoteData, profileData, peersData, newsData] = await Promise.all([
      getCompanyQuote(params),
      getCompanyProfile(params),
      getCompanyPeers(params),
      getCompanyNews(params),
    ]);

    return {
      quoteData,
      profileData,
      peersData,
      newsData,
    };
  },
};

const searchMachineJSON = ({ initialContext }) => {
  return {
    id: 'searchMachine',
    context: {
      currentSearchResults: {},
      // by default, init the app with a query for 'aapl'
      currentQuery: 'aapl',
      ...initialContext,
    },
    initial: pending,
    states: {
      [pending]: {
        invoke: {
          src: 'doSearch',
          onDone: [
            {
              cond: 'noTickerFound',
              target: noResults,
            },
            {
              target: nextSearch,
              actions: 'setSearchResInCtx',
            },
          ],
          onError: {
            target: error
          }
        },
      },

      [nextSearch]: {
        on: {
          [SEARCH]: {
            target: pending,
            actions: ['setCurrentQueryInCtx', 'updateQueryParamInUrl']
          },
        },
      },

      [noResults]: {
        on: {
          [SEARCH]: {
            target: pending,
            actions: 'setCurrentQueryInCtx',
          },
        },
      },

      [error]: {}
    },
  };
};

export const createSearchMachine = ({ initialContext = {} }) => {
  const query = getUrlParam('query');
  if (query) {
    // prefer the `query` param over the default, below
    initialContext.currentQuery = query;
  }
  return createMachine(searchMachineJSON({ initialContext })).withConfig({
    actions,
    services,
    guards,
  });
};
