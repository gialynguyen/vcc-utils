import { isArray } from "./isArray";

export function isBoolean(value: any): value is boolean {
  return (
    value === true ||
    value === false ||
    (value != null &&
      typeof value === "object" &&
      !isArray(value) &&
      toString.call(value) == "[object Boolean]")
  );
}
