"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSunLongitude = exports.sunLongitude = void 0;
const utils_1 = require("./utils");
/** Compute the longitude of the sun at any time.
 * Parameter: floating number jdn, the number of days since 1/1/4713 BC noon
 * Algorithm from: "Astronomical Algorithms" by Jean Meeus, 1998
 */
function sunLongitude(jdn) {
    const T = (jdn - 2451545.0) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
    const T2 = T * T;
    const dr = utils_1.PI / 180; // degree to radian
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL; // true longitude, degree
    L = L * dr;
    L = L - utils_1.PI * 2 * ((0, utils_1.INT)(L / (utils_1.PI * 2))); // Normalize to (0, 2*PI)
    return L;
}
exports.sunLongitude = sunLongitude;
/* Compute sun position at midnight of the day with the given Julian day number.
 * The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00.
 * The function returns a number between 0 and 11.
 * From the day after March equinox and the 1st major term after March equinox, 0 is returned.
 * After that, return 1, 2, 3 ...
 */
function getSunLongitude(jdn, timezone) {
    return (0, utils_1.INT)(sunLongitude(jdn - 0.5 - timezone / 24) / utils_1.PI * 6);
}
exports.getSunLongitude = getSunLongitude;
