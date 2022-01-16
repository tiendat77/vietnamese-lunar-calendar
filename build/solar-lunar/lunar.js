"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeapMonthOffset = exports.getLunarMonth11 = void 0;
const utils_1 = require("./utils");
const julian_1 = require("./julian");
const new_moon_1 = require("./new-moon");
const sun_longitude_1 = require("./sun-longitude");
/* Find the day that starts the luner month 11 of the given year for the given time zone */
function getLunarMonth11(year, timezone) {
    const off = (0, julian_1.jdFromDate)(31, 12, year) - 2415021;
    const k = (0, utils_1.INT)(off / 29.530588853);
    const nm = (0, new_moon_1.getNewMoon)(k, timezone);
    const sunLong = (0, sun_longitude_1.getSunLongitude)(nm, timezone); // sun longitude at local midnight
    return sunLong >= 9 ? (0, new_moon_1.getNewMoon)(k - 1, timezone) : nm;
}
exports.getLunarMonth11 = getLunarMonth11;
/* Find the index of the leap month after the month starting on the day a11. */
function getLeapMonthOffset(a11, timezone) {
    const k = (0, utils_1.INT)((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1; // We start with the month following lunar month 11
    let arc = (0, sun_longitude_1.getSunLongitude)((0, new_moon_1.getNewMoon)(k + i, timezone), timezone);
    do {
        i++;
        last = arc;
        arc = (0, sun_longitude_1.getSunLongitude)((0, new_moon_1.getNewMoon)(k + i, timezone), timezone);
    } while (arc != last && i < 14);
    return i - 1;
}
exports.getLeapMonthOffset = getLeapMonthOffset;
