import { LunarDate } from './lunar';
import { SolarDate } from './solar';
export interface CalendarDay {
    solar: SolarDate;
    lunar: LunarDate;
    isDisabled: boolean;
    isToday: boolean;
}
export declare class Calendar {
    year: number;
    month: number;
    weeks: CalendarDay[][];
    constructor(year: number, month: number);
    toString(): string;
    private _isToday;
    private _isDisable;
}
