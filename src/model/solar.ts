import {
  WEEKDAY,
  INTERNATIONAL_HOLIDAYS
} from '../constant';

export class SolarDate {

  public dayInWeek: string;

  get holiday(): string | null {
    return INTERNATIONAL_HOLIDAYS.find(d =>
      d.day === this.date &&
      d.month === this.month
    )?.info || null;
  }

  constructor(
    public year: number,
    public month: number,
    public date: number,
    public day: number,
  ) {
    this.dayInWeek = WEEKDAY[day];
  }

  toString() {
    return `${this.dayInWeek} ${this.date}/${this.month}/${this.year}`;
  }

}
