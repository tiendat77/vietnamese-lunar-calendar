export declare class SolarDate {
    year: number;
    month: number;
    date: number;
    day: number;
    dayInWeek: string;
    get holiday(): string | null;
    constructor(year: number, month: number, date: number, day: number);
    toString(): string;
}
