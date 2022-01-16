export interface Lunar {
    can: string;
    chi: string;
}
export declare class LunarDate {
    year: number;
    month: number;
    date: number;
    isLeap: boolean;
    julian: number;
    lunarHour: Lunar;
    lunarDate: Lunar;
    lunarMonth: Lunar;
    lunarYear: Lunar;
    isVegetarianDay: boolean;
    get holiday(): string | null;
    get luckyHours(): string[];
    get solarTerm(): string;
    constructor(year: number, month: number, date: number, isLeap: boolean, julian: number);
    toString(): string;
    private getLunarYear;
    private getLunarMonth;
    private getLunarDate;
    private getLunarHour;
    private checkVegetarianDay;
}
