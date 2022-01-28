"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
const lunar_1 = require("./lunar");
const solar_1 = require("./solar");
class Calendar {
    constructor(year, month) {
        this.year = year;
        this.month = month;
        let daysInMonth = new Date(year, month - 1, 0).getDate();
        const date = new Date(year, month - 1, 1);
        // week start from Monday
        while (date.getDay() !== 1) {
            date.setDate(date.getDate() - 1);
            daysInMonth++;
        }
        while (daysInMonth % 7 !== 0) {
            daysInMonth++;
        }
        const weeks = [];
        for (let i = 0; i < daysInMonth; i++) {
            // push new week
            if (i % 7 === 0) {
                weeks.push([]);
            }
            weeks[weeks.length - 1].push({
                solar: new solar_1.SolarDate(date),
                lunar: new lunar_1.LunarDate(date),
                isDisabled: this._isDisable(date),
                isToday: this._isToday(date)
            });
            date.setDate(date.getDate() + 1);
        }
        this.weeks = weeks;
    }
    toString() {
        const twoDigit = (value) => {
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
    _isToday(date) {
        const today = new Date();
        return today.getDate() === date.getDate() &&
            today.getMonth() === date.getMonth();
    }
    _isDisable(date) {
        return (date.getMonth() + 1) !== this.month;
    }
}
exports.Calendar = Calendar;
