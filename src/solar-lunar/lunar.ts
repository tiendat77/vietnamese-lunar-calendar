import { INT } from './utils';
import { jdFromDate } from './julian';
import { getNewMoon } from './new-moon';
import { getSunLongitude } from './sun-longitude';

/* Find the day that starts the luner month 11 of the given year for the given time zone */
export function getLunarMonth11(year: number, timezone: any) {
  const off = jdFromDate(31, 12, year) - 2415021;
  const k = INT(off / 29.530588853);
  const nm = getNewMoon(k, timezone);
  const sunLong = getSunLongitude(nm, timezone); // sun longitude at local midnight
  return sunLong >= 9 ? getNewMoon(k - 1, timezone) : nm;
}

/* Find the index of the leap month after the month starting on the day a11. */
export function getLeapMonthOffset(a11: number, timezone: any) {
  const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);

  let last = 0;
  let i = 1; // We start with the month following lunar month 11
  let arc = getSunLongitude(getNewMoon(k + i, timezone), timezone);

  do {
    i++;
    last = arc;
    arc = getSunLongitude(getNewMoon(k + i, timezone), timezone);
  } while (arc != last && i < 14);

  return i - 1;
}
