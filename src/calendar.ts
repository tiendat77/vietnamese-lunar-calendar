import { convertSolar2Lunar } from './solar-lunar';
import { LunarDate, SolarDate } from './model';

function getSolarDate(date: Date): SolarDate {
  return new SolarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getDay());
}

function getLunarDate(date: Date): LunarDate {
  const lunar = convertSolar2Lunar(
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()
  );

  return new LunarDate(
    lunar.year,
    lunar.month,
    lunar.date,
    lunar.isLeap,
    lunar.julian,
  );
}

export function getCalendar(date: Date) {
  return {
    lunar: getLunarDate(date),
    solar: getSolarDate(date),
  };
}

export default {
  getCalendar
}
