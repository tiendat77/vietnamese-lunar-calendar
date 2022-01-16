import { getLocalTimezone, INT } from './utils';
import { jdFromDate } from './julian';
import { getNewMoon } from './new-moon';
import { getLunarMonth11, getLeapMonthOffset } from './lunar';

/* Convert solar date dd/mm/yyyy to the corresponding lunar date */
export function convertSolar2Lunar(dd: number, mm: number, yy: number, timezone: any = getLocalTimezone()) {
  let k, monthStart, a11, b11, lunarDay, lunarMonth;
  let lunarYear, lunarLeap, diff, leapMonthDiff;

  const dayNumber = jdFromDate(dd, mm, yy);
  k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  monthStart = getNewMoon(k + 1, timezone);

  if (monthStart > dayNumber) {
    monthStart = getNewMoon(k, timezone);
  }

  a11 = getLunarMonth11(yy, timezone);
  b11 = a11;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timezone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timezone);
  }

  lunarDay = dayNumber - monthStart + 1;
  diff = INT((monthStart - a11) / 29);
  lunarLeap = 0;
  lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    leapMonthDiff = getLeapMonthOffset(a11, timezone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff == leapMonthDiff) {
        lunarLeap = 1;
      }
    }
  }

  if (lunarMonth > 12) {
    lunarMonth = lunarMonth - 12;
  }

  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }

  return {
    date: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeap: lunarLeap === 1,
    julian: dayNumber,
  };
}