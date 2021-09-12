import { addDays, format } from 'date-fns';

export const formatApiDate = (date) => format(date, 'yyyy-MM-dd');

export const getFromTo = (rangeDays) => {
  const from = new Date();
  const to = addDays(from, rangeDays);

  return {
    from: formatApiDate(from),
    to: formatApiDate(to)
  };
};

export const formatNewsFeedDisplayDate = (unixTimestamp) => {
  return format(new Date(unixTimestamp * 1000), 'P');
};

export const normalizeQuoteData = (quoteData) => {
  const normalizedKeys = {
    c: 'currentPrice',
    d: 'changeInPrice',
    dp: 'percentChangeInPrice',
    h: 'dayHighPrice',
    l: 'dayLowPrice',
    o: 'openPrice',
    pc: 'previousClosePrice'
  };

  const normalizedData = {};

  Object.entries(quoteData).forEach(([key, value]) => {
    const normalizedKey = normalizedKeys[key];
    normalizedData[normalizedKey] = value;
  });

  return normalizedData;
};
