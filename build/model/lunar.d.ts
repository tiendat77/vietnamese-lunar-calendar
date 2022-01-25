export declare class Lunar {
    can: string;
    chi: string;
    constructor(can: string, chi: string);
    toString(): string;
}
export declare class LunarDate {
    year: number;
    month: number;
    date: number;
    lunarHour: Lunar;
    lunarDate: Lunar;
    lunarMonth: Lunar;
    lunarYear: Lunar;
    isLeap: boolean;
    isVegetarianDay: boolean;
    holiday: string | null;
    luckyHours: string | null;
    solarTerm: string | null;
    private julian;
    constructor(year: number, month: number, date: number);
    constructor(date: Date);
    constructor();
    getYear(): number;
    getMonth(): number;
    getDate(): number;
    getLunarYear(): string;
    getLunarMonth(): string;
    getLunarDate(): string;
    toString(): string;
    private _getLunarYear;
    private _getLunarMonth;
    private _getLunarDate;
    private _getLunarHour;
    private _getHoliday;
    private _getLuckyHours;
    private _getSolarTerm;
    private _checkVegetarianDay;
}
