export declare class SolarDate {
    dayInWeek: string;
    year: number;
    month: number;
    date: number;
    get holiday(): string | null;
    constructor(year: number, month: number, date: number);
    constructor(date: Date);
    constructor();
    toString(): string;
    getYear(): number;
    getMonth(): number;
    getDate(): number;
}
