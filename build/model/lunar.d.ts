export interface Lunar {
    can: string;
    chi: string;
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
    private julian;
    get holiday(): string | null;
    get luckyHours(): string[];
    get solarTerm(): string;
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
    private _checkVegetarianDay;
}
