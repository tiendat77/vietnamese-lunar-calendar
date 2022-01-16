"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalendar = void 0;
const solar_lunar_1 = require("./solar-lunar");
const model_1 = require("./model");
function getSolarDate(date) {
    return new model_1.SolarDate(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getDay());
}
function getLunarDate(date) {
    const lunar = (0, solar_lunar_1.convertSolar2Lunar)(date.getDate(), date.getMonth() + 1, date.getFullYear());
    return new model_1.LunarDate(lunar.year, lunar.month, lunar.date, lunar.isLeap, lunar.julian);
}
function getCalendar(date) {
    return {
        lunar: getLunarDate(date),
        solar: getSolarDate(date),
    };
}
exports.getCalendar = getCalendar;
exports.default = {
    getCalendar
};
