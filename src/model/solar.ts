import {
  WEEKDAY,
  INTERNATIONAL_HOLIDAYS
} from '../constant';

export class SolarDate {

  dayInWeek: string;
  year: number;
  month: number;
  date: number;

  get holiday(): string | null {
    return INTERNATIONAL_HOLIDAYS.find(d =>
      d.day === this.date &&
      d.month === this.month
    )?.info || null;
  }

  constructor(year: number, month: number, date: number);

  constructor(date: Date);

  constructor();

  constructor(...args: any[]) {

    if (args.length === 3) {
      // year month date constructor
      this.year = args[0];
      this.month = args[1];
      this.date = args[2];
      this.dayInWeek = WEEKDAY[new Date(args[0], args[1] - 1, args[2]).getDay()];

    } else if (args.length === 1) {
      // js Date constructor
      const date: Date = args[0];
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.date = date.getDate();
      this.dayInWeek = WEEKDAY[date.getDay()];

    } else {
      // empty constructor
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.date = date.getDate();
      this.dayInWeek = WEEKDAY[date.getDay()];
    }
  }

  toString() {
    return `${this.dayInWeek} ` +
      `${this.date > 9 ? this.date : '0' + this.date}/` +
      `${this.month  > 9 ? this.month : '0' + this.month}/` +
      `${this.year}`;
  }

  getYear() {
    return this.year;
  }

  getMonth() {
    return this.month;
  }

  getDate() {
    return this.date;
  }

}
