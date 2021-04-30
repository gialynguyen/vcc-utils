import { isArray } from "./isArray";

export function isDate(value: any): boolean {
  return (
    value != null &&
    typeof value === "object" &&
    !isArray(value) &&
    toString.call(value) == "[object Date]"
  );
}

export function isValidDate(value: any): boolean {
  const tryParseDate = new Date(value);
  return isDate(tryParseDate) && !isNaN(tryParseDate.getTime());
}
