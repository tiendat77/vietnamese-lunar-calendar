"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarDate = void 0;
const constant_1 = require("../constant");
class SolarDate {
    constructor(year, month, date, day) {
        this.year = year;
        this.month = month;
        this.date = date;
        this.day = day;
        this.dayInWeek = constant_1.WEEKDAY[day];
    }
    get holiday() {
        var _a;
        return ((_a = constant_1.INTERNATIONAL_HOLIDAYS.find(d => d.day === this.date &&
            d.month === this.month)) === null || _a === void 0 ? void 0 : _a.info) || null;
    }
    toString() {
        return `${this.dayInWeek} ${this.date}/${this.month}/${this.year}`;
    }
}
exports.SolarDate = SolarDate;
