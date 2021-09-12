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
  setSearchResInContext: assign({
    currentSearchResults: (ctx, ev) => ev.data,
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
      tickerSymbol: ev.data.tickerSymbol,
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
      ...initialContext,
    },
    initial: newSearch,
    states: {
      [newSearch]: {
        on: {
          [SEARCH]: {
            target: pending,
          },
        },
      },

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
              actions: 'setSearchResInContext',
            },
          ],
        },
      },

      [nextSearch]: {
        on: {
          [SEARCH]: {
            target: pending,
          },
        },
      },

      [noResults]: {
        on: {
          [SEARCH]: {
            target: pending,
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
