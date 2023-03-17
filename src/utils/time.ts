import { fromUnixTime, format, isToday } from "date-fns";

const toHumanReadableDate = (unixTs: number) => {
  const dateFNS = fromUnixTime(unixTs);
  return format(dateFNS, "dd MMM");
};

const isUnixTsToday = (unixTs: number) => {
  const dateFNS = fromUnixTime(unixTs);
  return isToday(dateFNS);
};
export { toHumanReadableDate, isUnixTsToday };
