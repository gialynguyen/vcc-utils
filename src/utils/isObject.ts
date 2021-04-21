import { isArray } from "./isArray";

export function isObject(value: any): boolean {
	return value != null && typeof value === 'object' && !isArray(value);
}