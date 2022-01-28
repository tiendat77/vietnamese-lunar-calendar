"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarDate = exports.Lunar = void 0;
const constant_1 = require("../constant");
const solar_lunar_1 = require("../solar-lunar");
class Lunar {
    constructor(can, chi) {
        this.can = can;
        this.chi = chi;
    }
    toString() {
        return this.can + ' ' + this.chi;
    }
}
exports.Lunar = Lunar;
class LunarDate {
    constructor(...args) {
        let solarDate;
        let solarMonth;
        let solarYear;
        if (args.length === 3) {
            // year month date constructor
            solarYear = args[0];
            solarMonth = args[1];
            solarDate = args[2];
        }
        else if (args.length === 1) {
            // js Date constructor
            const date = args[0];
            solarYear = date.getFullYear();
            solarMonth = date.getMonth() + 1;
            solarDate = date.getDate();
        }
        else {
            // empty constructor
            const date = new Date();
            solarYear = date.getFullYear();
            solarMonth = date.getMonth() + 1;
            solarDate = date.getDate();
        }
        const lunar = (0, solar_lunar_1.convertSolar2Lunar)(solarDate, solarMonth, solarYear);
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
        this.holiday = this._getHoliday(lunar.month, lunar.date);
        this.luckyHours = this._getLuckyHours(lunar.julian);
        this.solarTerm = this._getSolarTerm(lunar.julian);
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
            `Lucky hours: ${this.luckyHours}\n` +
            `${this.holiday ? this.holiday + '\n' : ''}` +
            `${this.isVegetarianDay ? 'Vegetarian Day\n' : ''}`;
    }
    _getLunarYear(year) {
        const can = constant_1.HEAVENLY_STEM[(year + 6) % 10];
        const chi = constant_1.EARTHLY_BRANCH[(year + 8) % 12];
        return new Lunar(can, chi);
    }
    _getLunarMonth(year, month) {
        const can = constant_1.HEAVENLY_STEM[(year * 12 + month + 3) % 10];
        const chi = constant_1.EARTHLY_BRANCH[(month + 1) % 12];
        return new Lunar(can, chi);
    }
    _getLunarDate(jd) {
        const can = constant_1.HEAVENLY_STEM[(jd + 9) % 10];
        const chi = constant_1.EARTHLY_BRANCH[(jd + 1) % 12];
        return new Lunar(can, chi);
    }
    _getLunarHour(jd) {
        const can = constant_1.HEAVENLY_STEM[(jd - 1) * 2 % 10];
        const chi = constant_1.EARTHLY_BRANCH[0];
        return new Lunar(can, chi);
    }
    _getHoliday(month, date) {
        var _a;
        return ((_a = constant_1.NATIONAL_HOLIDAYS.find(d => d.day === date &&
            d.month === month)) === null || _a === void 0 ? void 0 : _a.info) || null;
    }
    _getLuckyHours(julian) {
        const chi = (julian + 1) % 12;
        const hours = constant_1.LUCKY_HOURS[chi % 6]; // same values for Ty' (1) and Ngo. (6), for Suu and Mui etc.
        const luckyHours = [];
        for (let i = 0; i < 12; i++) {
            if (hours.charAt(i) !== '1') {
                continue;
            }
            luckyHours.push(`${constant_1.EARTHLY_BRANCH[i]} (${(i * 2 + 23) % 24}-${(i * 2 + 1) % 24})`
            // `${EARTHLY_BRANCH[i]}`
            );
        }
        return luckyHours.join(', ');
    }
    _getSolarTerm(julian) {
        const sunLong = (0, solar_lunar_1.sunLongitude)(julian + 0.5 - (0, solar_lunar_1.getLocalTimezone)() / 24) / Math.PI * 12;
        return constant_1.SOLAR_TERM[Math.floor(sunLong)];
    }
    _checkVegetarianDay(day) {
        return constant_1.VEGETARIAN_DAY.indexOf(day) !== -1;
    }
}
exports.LunarDate = LunarDate;
