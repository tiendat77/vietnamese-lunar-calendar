export declare class SolarDate {
    year: number;
    month: number;
    date: number;
    dayInWeek: number;
    weekDay: string;
    holiday: string | null;
    isToday: boolean;
    constructor(year: number, month: number, date: number);
    constructor(date: Date);
    constructor();
    toString(): string;
    getYear(): number;
    getMonth(): number;
    getDate(): number;
    private _getHoliday;
    private _isToday;
}
