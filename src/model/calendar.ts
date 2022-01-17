import { LunarDate } from './lunar';
import { SolarDate } from './solar';

export interface CalendarDay {
  solar: SolarDate;
  lunar: LunarDate;
  isDisabled: boolean;
  isToday: boolean;
}

export class Calendar {

  weeks: CalendarDay[][];

  constructor(public year: number, public month: number) {
    let daysInMonth = new Date(year, month - 1, 0).getDate();

    const date: Date = new Date(year, month - 1, 1);

    // week start from Sunday
    while (date.getDay() !== 0) {
      date.setDate(date.getDate() - 1);
      daysInMonth++;
    }

    while (daysInMonth % 7 !== 0) {
      daysInMonth++;
    }

    const weeks: CalendarDay[][] = [];

    for (let i = 0; i < daysInMonth; i++) {
      // push new week
      if (i % 7 === 0) {
        weeks.push([]);
      }

      weeks[weeks.length - 1].push({
        solar: new SolarDate(date),
        lunar: new LunarDate(date),
        isDisabled: this._isDisable(date),
        isToday: this._isToday(date)
      });

      date.setDate(date.getDate() + 1);
    }

    this.weeks = weeks;
  }

  toString() {
    const twoDigit = (value: number) => {
      return value < 10 ? ' ' + value : value;
    };

    let calendar = `-------- Year ${this.year} - Month ${this.month} --------\n`;

    for (const week of this.weeks) {
      for (const day of week) {
        calendar += `${twoDigit(day.solar.date)}   `;
      }

      calendar += '\n';
    }

    return calendar;
  }

  private _isToday(date: Date) {
    const today = new Date();
    return today.getDate() === date.getDate() &&
           today.getMonth() === date.getMonth();
  }

  private _isDisable(date: Date) {
    return (date.getMonth() + 1) !== this.month;
  }

}