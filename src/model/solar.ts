import {
  WEEKDAY,
  INTERNATIONAL_HOLIDAYS
} from '../constant';

export class SolarDate {

  dayInWeek: string;
  year: number;
  month: number;
  date: number;

  holiday: string | null;
  isToday: boolean;

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

    this.holiday = this._getHoliday(this.month, this.date);
    this.isToday = this._isToday(this.year, this.month, this.date);
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

  private _getHoliday(month: number, date: number) {
    return INTERNATIONAL_HOLIDAYS.find(d =>
      d.day === date &&
      d.month === month
    )?.info || null;
  }

  private _isToday(year: number, month: number, date: number) {
    const today = new Date();
    return today.getDate() === date &&
           today.getMonth() === (month - 1) &&
           today.getFullYear() === year;
  }

}
