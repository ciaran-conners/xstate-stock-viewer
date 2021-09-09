import { format, addDays } from 'date-fns';

export const formatApiDate = (date) => format(date, 'yyyy-MM-dd');

export const getFromTo = (rangeDays) => {
  const from = new Date();
  const to = addDays(from, rangeDays);

  return {
    from: formatApiDate(from),
    to: formatApiDate(to)
  };
};
