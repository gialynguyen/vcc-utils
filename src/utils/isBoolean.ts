import { isArray } from "./isArray";

export function isBoolean(value: any): boolean {
  return (
    value === true ||
    value === false ||
    (value != null &&
      typeof value === "object" &&
      !isArray(value) &&
      toString.call(value) == "[object Boolean]")
  );
}
