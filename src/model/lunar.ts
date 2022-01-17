import {
  SOLAR_TERM,
  LUCKY_HOURS,
  HEAVENLY_STEM,
  EARTHLY_BRANCH,
  VEGETARIAN_DAY,
  NATIONAL_HOLIDAYS,
} from '../constant';

import {
  sunLongitude,
  getLocalTimezone,
  convertSolar2Lunar
} from '../solar-lunar';

export interface Lunar {
  can: string;
  chi: string;
}

export class LunarDate {

  year: number;
  month: number;
  date: number;

  lunarHour: Lunar;
  lunarDate: Lunar;
  lunarMonth: Lunar;
  lunarYear: Lunar;

  isLeap: boolean;
  isVegetarianDay: boolean;

  private julian: number

  get holiday(): string | null {
    return NATIONAL_HOLIDAYS.find(d =>
      d.day === this.date &&
      d.month === this.month
    )?.info || null;
  }

  get luckyHours() {
    const chi = (this.julian + 1) % 12;
    const hours = LUCKY_HOURS[chi % 6];  // same values for Ty' (1) and Ngo. (6), for Suu and Mui etc.

    const luckyHours: string[] = [];
    for (let i = 0; i < 12; i++) {
      if (hours.charAt(i) !== '1') {
        continue;
      }
      luckyHours.push(
        `${EARTHLY_BRANCH[i]} (${(i * 2 + 23) % 24} - ${(i * 2 + 1) % 24})`
      );
    }

    return luckyHours;
  }

  get solarTerm() {
    const sunLong = sunLongitude(this.julian + 0.5 - getLocalTimezone() / 24) / Math.PI * 12;
    return SOLAR_TERM[Math.floor(sunLong)];
  }

  constructor(year: number, month: number, date: number);

  constructor(date: Date);

  constructor();

  constructor(...args: any[]) {
    let solarDate: number;
    let solarMonth: number;
    let solarYear: number;

    if (args.length === 3) {
      // year month date constructor
      solarYear = args[0];
      solarMonth = args[1];
      solarDate = args[2];

    } else if (args.length === 1) {
      // js Date constructor
      const date: Date = args[0];
      solarYear = date.getFullYear();
      solarMonth = date.getMonth() + 1;
      solarDate = date.getDate();

    } else {
      // empty constructor
      const date = new Date();
      solarYear = date.getFullYear();
      solarMonth = date.getMonth() + 1;
      solarDate = date.getDate();
    }

    const lunar = convertSolar2Lunar(solarDate, solarMonth, solarYear);

    this.year = lunar.year;
    this.month = lunar.month;
    this.date = lunar.date;

    this.julian = lunar.julian;
    this.isLeap = lunar.isLeap;
    this.isVegetarianDay = this._checkVegetarianDay(lunar.date);

    this.lunarYear = this._getLunarYear(lunar.year);
    this.lunarMonth = this._getLunarMonth(lunar.year, lunar.month);
    this.lunarDate = this._getLunarDate(lunar.julian);
    this.lunarHour = this._getLunarHour(lunar.julian);
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

  getLunarYear() {
    return this.lunarYear.can + ' ' + this.lunarYear.chi;
  }

  getLunarMonth() {
    return this.lunarMonth.can + ' ' + this.lunarMonth.chi;
  }

  getLunarDate() {
    return this.lunarDate.can + ' ' + this.lunarDate.chi;
  }

  toString() {
    const day = `${this.date} (${this.lunarDate.can} ${this.lunarDate.chi})`;
    const month = `${this.month} (${this.lunarMonth.can} ${this.lunarMonth.chi})`;
    const year = `${this.year} (${this.lunarYear.can} ${this.lunarYear.chi})`;
    const hour = this.lunarHour.can + ' ' + this.lunarHour.chi;

    return `Year: ${year}\n` +
      `Month: ${month}\n` +
      `Day: ${day}\n` +
      `Hour: ${hour}\n` +
      `Solar term: ${this.solarTerm}\n` +
      `Lucky hours: ${this.luckyHours.join(', ')}\n` +
      `${this.holiday ? this.holiday + '\n' : ''}` +
      `${this.isVegetarianDay ? 'Vegetarian Day\n': ''}`;
  }

  private _getLunarYear(year: number): Lunar {
    return {
      can: HEAVENLY_STEM[(year + 6) % 10],
      chi: EARTHLY_BRANCH[(year + 8) % 12],
    };
  }

  private _getLunarMonth(year: number, month: number): Lunar {
    return {
      can: HEAVENLY_STEM[(year * 12 + month + 3) % 10],
      chi: EARTHLY_BRANCH[(month + 1) % 12],
    };
  }

  private _getLunarDate(jd: number): Lunar {
    return {
      can: HEAVENLY_STEM[(jd + 9) % 10],
      chi: EARTHLY_BRANCH[(jd + 1) % 12],
    };
  }

  private _getLunarHour(jd: number): Lunar {
    return {
      can: HEAVENLY_STEM[(jd - 1) * 2 % 10],
      chi: EARTHLY_BRANCH[0]
    };
  }

  private _checkVegetarianDay(day: number) {
    return VEGETARIAN_DAY.indexOf(day) !== -1;
  }

}
