import { createMachine, assign } from 'xstate';

import {
  getCompanyQuote,
  getCompanyProfile,
  getCompanyPeers,
  getCompanyNews,
} from '../api';

const idle = '@states/idle';
const pending = '@states/pending';

const SEARCH = '@events/search';

const actions = {
  setSearchResInContext: assign({
    currentSearchResults: (ctx, ev) => ev.data
  }),
};

// const guards = {};

const services = {
  doNewSearch: async () => {
    const params = {
      tickerSymbol: 'aapl',
    };

    const [quoteData, profileData, peersData, newsData] = await Promise.all([
      getCompanyQuote(params),
      getCompanyProfile(params),
      getCompanyPeers(params),
      getCompanyNews(params),
    ]);

    console.log({
      quoteData,
      profileData,
      peersData,
      newsData,
    });

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
    initial: pending,
    context: {
      currentSearchResults: {},
      ...initialContext
    },
    states: {
      [idle]: {
        on: {
          [SEARCH]: {
            target: pending,
          },
        },
      },

      [pending]: {
        invoke: {
          src: services.doNewSearch,
          onDone: {
            target: idle,
            actions: actions.setSearchResInContext,
          },
        },
      },
    },
  };
};

export const createSearchMachine = ({ initialContext }) =>
  createMachine(searchMachineJSON({ initialContext }));
