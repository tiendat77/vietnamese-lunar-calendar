import { getCalendar } from './calendar';

const dates = [
  new Date(1997, 6, 7),
  new Date(1995, 10, 2),
  new Date(),
  new Date(2022, 0, 29),
  new Date(2022, 1, 1),
];

for (const date of dates) {
  const calendar = getCalendar(date);
  const hellyeah = `Solar Date: \n${calendar.solar.toString()}\n\nLunar Date: \n${calendar.lunar.toString()}\n`;
  console.log(hellyeah, '----------');
}
