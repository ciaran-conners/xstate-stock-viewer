import { createMachine, assign } from 'xstate';

import {
  getCompanyQuote,
  getCompanyProfile,
  getCompanyPeers,
  getCompanyNews,
} from '../api';

export const newSearch = '@states/newSearch';
export const pending = '@states/pending';
export const nextSearch = '@states/nextSearch';
export const noResults = '@states/noResults';

export const SEARCH = '@events/search';

const actions = {
  setSearchResInCtx: assign({
    currentSearchResults: (ctx, ev) => ev.data,
  }),
  setCurrentQueryInCtx: assign({
    currentQuery: (ctx, ev) => ev.data.query
  })
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
      currentQuery: 'aapl',
      ...initialContext,
    },
    initial: pending,
    states: {
      // [newSearch]: {
      //   on: {
      //     [SEARCH]: {
      //       target: pending,
      //       actions: 'setCurrentQueryInCtx'
      //     },
      //   },
      // },

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
        },
      },

      [nextSearch]: {
        on: {
          [SEARCH]: {
            target: pending,
            actions: 'setCurrentQueryInCtx'
          },
        },
      },

      [noResults]: {
        on: {
          [SEARCH]: {
            target: pending,
            actions: 'setCurrentQueryInCtx'
          },
        },
      },
    },
  };
};

export const createSearchMachine = ({ initialContext = {} }) =>
  createMachine(searchMachineJSON({ initialContext })).withConfig({
    actions,
    services,
    guards,
  });
