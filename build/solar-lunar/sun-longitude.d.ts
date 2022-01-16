/** Compute the longitude of the sun at any time.
 * Parameter: floating number jdn, the number of days since 1/1/4713 BC noon
 * Algorithm from: "Astronomical Algorithms" by Jean Meeus, 1998
 */
export declare function sunLongitude(jdn: number): number;
export declare function getSunLongitude(jdn: number, timezone: number): number;
