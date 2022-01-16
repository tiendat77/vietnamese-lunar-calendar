"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendar_1 = require("./calendar");
const dates = [
    new Date(1997, 6, 7),
    new Date(1995, 10, 2),
    new Date(),
    new Date(2022, 0, 29),
    new Date(2022, 1, 1),
];
for (const date of dates) {
    const calendar = (0, calendar_1.getCalendar)(date);
    const hellyeah = `Solar Date: \n${calendar.solar.toString()}\n\nLunar Date: \n${calendar.lunar.toString()}\n`;
    console.log(hellyeah, '----------');
}
