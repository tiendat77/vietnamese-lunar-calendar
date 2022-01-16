"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSolar2Lunar = void 0;
const utils_1 = require("./utils");
const julian_1 = require("./julian");
const new_moon_1 = require("./new-moon");
const lunar_1 = require("./lunar");
/* Convert solar date dd/mm/yyyy to the corresponding lunar date */
function convertSolar2Lunar(dd, mm, yy, timezone = (0, utils_1.getLocalTimezone)()) {
    let k, monthStart, a11, b11, lunarDay, lunarMonth;
    let lunarYear, lunarLeap, diff, leapMonthDiff;
    const dayNumber = (0, julian_1.jdFromDate)(dd, mm, yy);
    k = (0, utils_1.INT)((dayNumber - 2415021.076998695) / 29.530588853);
    monthStart = (0, new_moon_1.getNewMoon)(k + 1, timezone);
    if (monthStart > dayNumber) {
        monthStart = (0, new_moon_1.getNewMoon)(k, timezone);
    }
    a11 = (0, lunar_1.getLunarMonth11)(yy, timezone);
    b11 = a11;
    if (a11 >= monthStart) {
        lunarYear = yy;
        a11 = (0, lunar_1.getLunarMonth11)(yy - 1, timezone);
    }
    else {
        lunarYear = yy + 1;
        b11 = (0, lunar_1.getLunarMonth11)(yy + 1, timezone);
    }
    lunarDay = dayNumber - monthStart + 1;
    diff = (0, utils_1.INT)((monthStart - a11) / 29);
    lunarLeap = 0;
    lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
        leapMonthDiff = (0, lunar_1.getLeapMonthOffset)(a11, timezone);
        if (diff >= leapMonthDiff) {
            lunarMonth = diff + 10;
            if (diff == leapMonthDiff) {
                lunarLeap = 1;
            }
        }
    }
    if (lunarMonth > 12) {
        lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
        lunarYear -= 1;
    }
    return {
        date: lunarDay,
        month: lunarMonth,
        year: lunarYear,
        isLeap: lunarLeap === 1,
        julian: dayNumber,
    };
}
exports.convertSolar2Lunar = convertSolar2Lunar;
