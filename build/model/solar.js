"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarDate = void 0;
const constant_1 = require("../constant");
class SolarDate {
    constructor(...args) {
        if (args.length === 3) {
            // year month date constructor
            this.year = args[0];
            this.month = args[1];
            this.date = args[2];
            this.dayInWeek = constant_1.WEEKDAY[new Date(args[0], args[1] - 1, args[2]).getDay()];
        }
        else if (args.length === 1) {
            // js Date constructor
            const date = args[0];
            this.year = date.getFullYear();
            this.month = date.getMonth() + 1;
            this.date = date.getDate();
            this.dayInWeek = constant_1.WEEKDAY[date.getDay()];
        }
        else {
            // empty constructor
            const date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth() + 1;
            this.date = date.getDate();
            this.dayInWeek = constant_1.WEEKDAY[date.getDay()];
        }
    }
    get holiday() {
        var _a;
        return ((_a = constant_1.INTERNATIONAL_HOLIDAYS.find(d => d.day === this.date &&
            d.month === this.month)) === null || _a === void 0 ? void 0 : _a.info) || null;
    }
    toString() {
        return `${this.dayInWeek} ` +
            `${this.date > 9 ? this.date : '0' + this.date}/` +
            `${this.month > 9 ? this.month : '0' + this.month}/` +
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
exports.SolarDate = SolarDate;
