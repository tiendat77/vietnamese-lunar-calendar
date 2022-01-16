"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalTimezone = exports.INT = exports.PI = void 0;
exports.PI = Math.PI;
/* Discard the fractional part of a number, e.g., INT(3.2) = 3 */
function INT(d) {
    return Math.floor(d);
}
exports.INT = INT;
/* Get client local timezone offset*/
function getLocalTimezone() {
    return -(new Date().getTimezoneOffset() / 60);
}
exports.getLocalTimezone = getLocalTimezone;
