"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLunar2Solar = void 0;
const utils_1 = require("./utils");
const julian_1 = require("./julian");
const new_moon_1 = require("./new-moon");
const lunar_1 = require("./lunar");
/* Convert a lunar date to the corresponding solar date */
function convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone) {
    let a11, b11, off, leapOff, leapMonth;
    if (lunarMonth < 11) {
        a11 = (0, lunar_1.getLunarMonth11)(lunarYear - 1, timeZone);
        b11 = (0, lunar_1.getLunarMonth11)(lunarYear, timeZone);
    }
    else {
        a11 = (0, lunar_1.getLunarMonth11)(lunarYear, timeZone);
        b11 = (0, lunar_1.getLunarMonth11)(lunarYear + 1, timeZone);
    }
    const k = (0, utils_1.INT)(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    off = lunarMonth - 11;
    if (off < 0) {
        off += 12;
    }
    if (b11 - a11 > 365) {
        leapOff = (0, lunar_1.getLeapMonthOffset)(a11, timeZone);
        leapMonth = leapOff - 2;
        if (leapMonth < 0) {
            leapMonth += 12;
        }
        if (lunarLeap != 0 && lunarMonth != leapMonth) {
            return new Array(0, 0, 0);
        }
        else if (lunarLeap != 0 || off >= leapOff) {
            off += 1;
        }
    }
    const monthStart = (0, new_moon_1.getNewMoon)(k + off, timeZone);
    return (0, julian_1.jdToDate)(monthStart + lunarDay - 1);
}
exports.convertLunar2Solar = convertLunar2Solar;
