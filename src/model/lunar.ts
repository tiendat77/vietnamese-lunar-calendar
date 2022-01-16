import {
  SOLAR_TERM,
  LUCKY_HOURS,
  HEAVENLY_STEM,
  EARTHLY_BRANCH,
  VEGETARIAN_DAY,
  NATIONAL_HOLIDAYS,
} from '../constant';

import { sunLongitude, getLocalTimezone } from '../solar-lunar';

export interface Lunar {
  can: string;
  chi: string;
}

export class LunarDate {

  public lunarHour: Lunar;
  public lunarDate: Lunar;
  public lunarMonth: Lunar;
  public lunarYear: Lunar;
  public isVegetarianDay: boolean;

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

  constructor(
    public year: number,
    public month: number,
    public date: number,
    public isLeap: boolean,
    public julian: number,
  ) {
    this.lunarYear = this.getLunarYear(year);
    this.lunarMonth = this.getLunarMonth(year, month);
    this.lunarDate = this.getLunarDate(julian);
    this.lunarHour = this.getLunarHour(julian);
    this.isVegetarianDay = this.checkVegetarianDay(date);
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

  private getLunarYear(year: number): Lunar {
    return {
      can: HEAVENLY_STEM[(year + 6) % 10],
      chi: EARTHLY_BRANCH[(year + 8) % 12],
    };
  }

  private getLunarMonth(year: number, month: number): Lunar {
    return {
      can: HEAVENLY_STEM[(year * 12 + month + 3) % 10],
      chi: EARTHLY_BRANCH[(month + 1) % 12],
    };
  }

  private getLunarDate(jd: number): Lunar {
    return {
      can: HEAVENLY_STEM[(jd + 9) % 10],
      chi: EARTHLY_BRANCH[(jd + 1) % 12],
    };
  }

  private getLunarHour(jd: number): Lunar {
    return {
      can: HEAVENLY_STEM[(jd - 1) * 2 % 10],
      chi: EARTHLY_BRANCH[0]
    };
  }

  private checkVegetarianDay(day: number) {
    return VEGETARIAN_DAY.indexOf(day) !== -1;
  }

}
