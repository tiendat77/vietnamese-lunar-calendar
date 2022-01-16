export const PI = Math.PI;

/* Discard the fractional part of a number, e.g., INT(3.2) = 3 */
export function INT(d: number) {
  return Math.floor(d);
}

/* Get client local timezone offset*/
export function getLocalTimezone() {
  return -(new Date().getTimezoneOffset() / 60);
}

