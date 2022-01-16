import { INT } from './utils';
import { jdToDate } from './julian';
import { getNewMoon } from './new-moon';
import { getLunarMonth11, getLeapMonthOffset } from './lunar';

/* Convert a lunar date to the corresponding solar date */
export function convertLunar2Solar(lunarDay: number, lunarMonth: number, lunarYear: number, lunarLeap: number, timeZone: any) {
  let a11, b11, off, leapOff, leapMonth;

  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone);
    b11 = getLunarMonth11(lunarYear, timeZone);
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone);
    b11 = getLunarMonth11(lunarYear + 1, timeZone);
  }

  const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  off = lunarMonth - 11;
  if (off < 0) {
    off += 12;
  }

  if (b11 - a11 > 365) {
    leapOff = getLeapMonthOffset(a11, timeZone);
    leapMonth = leapOff - 2;
    if (leapMonth < 0) {
      leapMonth += 12;
    }

    if (lunarLeap != 0 && lunarMonth != leapMonth) {
      return new Array(0, 0, 0);
    } else if (lunarLeap != 0 || off >= leapOff) {
      off += 1;
    }
  }

  const monthStart = getNewMoon(k + off, timeZone);
  return jdToDate(monthStart + lunarDay - 1);
}