import { fromUnixTime, format } from 'date-fns';

const toHumanReadableDateTime = (unixTs: number) => {
  const dateFNS = fromUnixTime(unixTs);
  return format(dateFNS, 'do MMM HH:mm');
};

export { toHumanReadableDateTime };
