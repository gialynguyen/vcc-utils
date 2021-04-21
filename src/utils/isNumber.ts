import { isArray } from "./isArray";

export function isNumber(value: any): boolean {
  const valueType = typeof value;
  return (
    valueType === "number" ||
    (valueType === "object" &&
      value != null &&
      !isArray(value) &&
      toString.call(value) == "[object Number]")
  );
}
