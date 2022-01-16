"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jdToDate = exports.jdFromDate = void 0;
const utils_1 = require("./utils");
/* Compute the (integral) Julian day number of day dd/mm/yyyy, i.e., the number
 * of days between 1/1/4713 BC (Julian calendar) and dd/mm/yyyy.
 * Formula from http://www.tondering.dk/claus/calendar.html
 */
function jdFromDate(day, month, year) {
    const a = (0, utils_1.INT)((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    let jd = day + (0, utils_1.INT)((153 * m + 2) / 5) + 365 * y + (0, utils_1.INT)(y / 4) - (0, utils_1.INT)(y / 100) + (0, utils_1.INT)(y / 400) - 32045;
    if (jd < 2299161) {
        jd = day + (0, utils_1.INT)((153 * m + 2) / 5) + 365 * y + (0, utils_1.INT)(y / 4) - 32083;
    }
    return jd;
}
exports.jdFromDate = jdFromDate;
/* Convert a Julian day number to day/month/year. Parameter jd is an integer */
function jdToDate(jd) {
    let a, b, c;
    // After 5/10/1582, Gregorian calendar
    if (jd > 2299160) {
        a = jd + 32044;
        b = (0, utils_1.INT)((4 * a + 3) / 146097);
        c = a - (0, utils_1.INT)((b * 146097) / 4);
    }
    else {
        b = 0;
        c = jd + 32082;
    }
    const d = (0, utils_1.INT)((4 * c + 3) / 1461);
    const e = c - (0, utils_1.INT)((1461 * d) / 4);
    const m = (0, utils_1.INT)((5 * e + 2) / 153);
    const day = e - (0, utils_1.INT)((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * (0, utils_1.INT)(m / 10);
    const year = b * 100 + d - 4800 + (0, utils_1.INT)(m / 10);
    return new Date(year, month - 1, day);
}
exports.jdToDate = jdToDate;
