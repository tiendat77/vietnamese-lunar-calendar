"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarDate = void 0;
const constant_1 = require("../constant");
const solar_lunar_1 = require("../solar-lunar");
class LunarDate {
    constructor(year, month, date, isLeap, julian) {
        this.year = year;
        this.month = month;
        this.date = date;
        this.isLeap = isLeap;
        this.julian = julian;
        this.lunarYear = this.getLunarYear(year);
        this.lunarMonth = this.getLunarMonth(year, month);
        this.lunarDate = this.getLunarDate(julian);
        this.lunarHour = this.getLunarHour(julian);
        this.isVegetarianDay = this.checkVegetarianDay(date);
    }
    get holiday() {
        var _a;
        return ((_a = constant_1.NATIONAL_HOLIDAYS.find(d => d.day === this.date &&
            d.month === this.month)) === null || _a === void 0 ? void 0 : _a.info) || null;
    }
    get luckyHours() {
        const chi = (this.julian + 1) % 12;
        const hours = constant_1.LUCKY_HOURS[chi % 6]; // same values for Ty' (1) and Ngo. (6), for Suu and Mui etc.
        const luckyHours = [];
        for (let i = 0; i < 12; i++) {
            if (hours.charAt(i) !== '1') {
                continue;
            }
            luckyHours.push(`${constant_1.EARTHLY_BRANCH[i]} (${(i * 2 + 23) % 24} - ${(i * 2 + 1) % 24})`);
        }
        return luckyHours;
    }
    get solarTerm() {
        const sunLong = (0, solar_lunar_1.sunLongitude)(this.julian + 0.5 - (0, solar_lunar_1.getLocalTimezone)() / 24) / Math.PI * 12;
        return constant_1.SOLAR_TERM[Math.floor(sunLong)];
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
            `${this.isVegetarianDay ? 'Vegetarian Day\n' : ''}`;
    }
    getLunarYear(year) {
        return {
            can: constant_1.HEAVENLY_STEM[(year + 6) % 10],
            chi: constant_1.EARTHLY_BRANCH[(year + 8) % 12],
        };
    }
    getLunarMonth(year, month) {
        return {
            can: constant_1.HEAVENLY_STEM[(year * 12 + month + 3) % 10],
            chi: constant_1.EARTHLY_BRANCH[(month + 1) % 12],
        };
    }
    getLunarDate(jd) {
        return {
            can: constant_1.HEAVENLY_STEM[(jd + 9) % 10],
            chi: constant_1.EARTHLY_BRANCH[(jd + 1) % 12],
        };
    }
    getLunarHour(jd) {
        return {
            can: constant_1.HEAVENLY_STEM[(jd - 1) * 2 % 10],
            chi: constant_1.EARTHLY_BRANCH[0]
        };
    }
    checkVegetarianDay(day) {
        return constant_1.VEGETARIAN_DAY.indexOf(day) !== -1;
    }
}
exports.LunarDate = LunarDate;
